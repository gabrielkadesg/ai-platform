import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';
import { aiLimiter } from '../middleware/rateLimiter';
import Joi from 'joi';
import { conversationService } from '../services/conversation.service';
import { messageService } from '../services/message.service';
import { AIProviderFactory } from '../services/ai.service';
import { NotFoundError } from '../errors/AppError';

const router = Router();
router.use(authMiddleware);

const createConversationSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  model: Joi.string().required(),
  project_id: Joi.string().optional(),
});

const sendMessageSchema = Joi.object({
  content: Joi.string().min(1).required(),
  role: Joi.string().valid('user', 'assistant').default('user'),
});

// Get all conversations
router.get(
  '/conversations',
  asyncHandler(async (req: AuthRequest, res) => {
    const conversations = await conversationService.findByUserId(req.user!.id);
    res.json(conversations);
  })
);

// Create conversation
router.post(
  '/conversations',
  validate(createConversationSchema),
  asyncHandler(async (req: AuthRequest, res) => {
    const { title, model, project_id } = req.body;
    const conversation = await conversationService.create(
      req.user!.id,
      title,
      model,
      project_id
    );
    res.status(201).json(conversation);
  })
);

// Get conversation
router.get(
  '/conversations/:id',
  asyncHandler(async (req: AuthRequest, res) => {
    const conversation = await conversationService.findById(req.params.id, req.user!.id);
    if (!conversation) {
      throw new NotFoundError('Conversation');
    }
    res.json(conversation);
  })
);

// Update conversation
router.put(
  '/conversations/:id',
  asyncHandler(async (req: AuthRequest, res) => {
    const conversation = await conversationService.update(req.params.id, req.user!.id, req.body);
    res.json(conversation);
  })
);

// Delete conversation
router.delete(
  '/conversations/:id',
  asyncHandler(async (req: AuthRequest, res) => {
    const success = await conversationService.delete(req.params.id, req.user!.id);
    res.json({ success });
  })
);

// Get messages
router.get(
  '/conversations/:id/messages',
  asyncHandler(async (req: AuthRequest, res) => {
    const conversation = await conversationService.findById(req.params.id, req.user!.id);
    if (!conversation) {
      throw new NotFoundError('Conversation');
    }

    const messages = await messageService.findByConversationId(req.params.id);
    res.json(messages);
  })
);

// Send message
router.post(
  '/conversations/:id/messages',
  aiLimiter,
  validate(sendMessageSchema),
  asyncHandler(async (req: AuthRequest, res) => {
    const conversation = await conversationService.findById(req.params.id, req.user!.id);
    if (!conversation) {
      throw new NotFoundError('Conversation');
    }

    const { content, role } = req.body;

    // Save user message
    await messageService.create(req.params.id, 'user', content);

    // Generate AI response
    const provider = AIProviderFactory.getProvider(conversation.model);
    const response = await provider.generate([
      { role: 'user', content },
    ]);

    // Save assistant message
    const assistantMessage = await messageService.create(
      req.params.id,
      'assistant',
      response.content,
      conversation.model,
      response.tokensUsed
    );

    res.status(201).json(assistantMessage);
  })
);

// Stream endpoint
router.post(
  '/stream',
  aiLimiter,
  asyncHandler(async (req: AuthRequest, res) => {
    const { conversationId, content, model } = req.body;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const provider = AIProviderFactory.getProvider(model);

    try {
      for await (const chunk of provider.generateStream([
        { role: 'user', content },
      ])) {
        res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
      }
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error) {
      res.write(`data: ${JSON.stringify({ error: 'Generation failed' })}\n\n`);
      res.end();
    }
  })
);

export default router;
