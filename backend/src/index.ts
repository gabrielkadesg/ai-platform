import app from './app';
import authRoutes from './routes/auth.routes';
import chatRoutes from './routes/chat.routes';
import filesRoutes from './routes/files.routes';
import profileRoutes from './routes/profile.routes';
import adminRoutes from './routes/admin.routes';

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/files', filesRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);

export default app;
