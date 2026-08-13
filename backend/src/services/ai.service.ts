import { config } from '../config';
import logger from '../utils/logger';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  model: string;
  tokensUsed: number;
  finishReason: string;
}

class OpenAIProvider {
  private apiKey: string;
  private model: string;
  private baseURL = 'https://api.openai.com/v1';

  constructor() {
    this.apiKey = config.openai.apiKey || '';
    this.model = config.openai.model;
  }

  async generate(messages: AIMessage[]): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        content: data.choices[0].message.content,
        model: this.model,
        tokensUsed: data.usage.total_tokens,
        finishReason: data.choices[0].finish_reason,
      };
    } catch (error) {
      logger.error('OpenAI generation error', error);
      throw error;
    }
  }

  async *generateStream(messages: AIMessage[]) {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: 0.7,
          max_tokens: 2000,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content;
              if (content) {
                yield content;
              }
            } catch (e) {
              logger.debug('Failed to parse streaming chunk', e);
            }
          }
        }
      }
    } catch (error) {
      logger.error('OpenAI streaming error', error);
      throw error;
    }
  }
}

class AnthropicProvider {
  private apiKey: string;
  private model: string;
  private baseURL = 'https://api.anthropic.com/v1';

  constructor() {
    this.apiKey = config.anthropic.apiKey || '';
    this.model = config.anthropic.model;
  }

  async generate(messages: AIMessage[]): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('Anthropic API key not configured');
    }

    try {
      const response = await fetch(`${this.baseURL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 2000,
          messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        content: data.content[0].text,
        model: this.model,
        tokensUsed: data.usage.input_tokens + data.usage.output_tokens,
        finishReason: data.stop_reason,
      };
    } catch (error) {
      logger.error('Anthropic generation error', error);
      throw error;
    }
  }

  async *generateStream(messages: AIMessage[]) {
    if (!this.apiKey) {
      throw new Error('Anthropic API key not configured');
    }

    try {
      const response = await fetch(`${this.baseURL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 2000,
          messages,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            try {
              const parsed = JSON.parse(data);
              if (parsed.type === 'content_block_delta') {
                yield parsed.delta.text;
              }
            } catch (e) {
              logger.debug('Failed to parse streaming chunk', e);
            }
          }
        }
      }
    } catch (error) {
      logger.error('Anthropic streaming error', error);
      throw error;
    }
  }
}

export class AIProviderFactory {
  static getProvider(model: string) {
    if (model.startsWith('gpt')) {
      return new OpenAIProvider();
    } else if (model.startsWith('claude')) {
      return new AnthropicProvider();
    }
    throw new Error(`Unknown model: ${model}`);
  }
}
