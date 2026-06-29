import express, { type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes';
import workspaceRoutes from './routes/workspace.routes';
import taskRoutes from './routes/auth.routes';

// booting the engine

dotenv.config(); // Loads environment variables from .env into process.env before any other code runs.

const app = express(); // Instantiates the core Express application (the central hub for routes and middleware).

const prisma = new PrismaClient(); // Initializes a single, reusable connection pool to your PostgreSQL database.

const PORT = process.env.PORT || 5000; // Dynamically assigns a port for cloud deployment, falling back to 5000 locally.


// middlewares

app.use(helmet()); // Applies 15 critical security headers to protect against common vulnerabilities like XSS and clickjacking.

app.use(cors()); // Instructs the browser to allow requests from different origins (crucial for your React frontend to talk to this API).

app.use(express.json()); // Intercepts incoming network streams and parses JSON payloads so they are readable in `req.body`.


// health checks

app.get('/api/health', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'healthy', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});


// ignition

app.listen(PORT, () => {
  console.log(`🚀 Synapse Backend running on http://localhost:${PORT}`);
});


app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/tasks', taskRoutes);