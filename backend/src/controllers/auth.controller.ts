import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();




export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    
    // Validate required fields
    if (!email || !password || !name) {
      res.status(400).json({ error: 'Name, email, and password are required.' });
      return;
    }

    // Check for existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: 'User with this email already exists.' });
      return;
    }

    // Hash and store
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, name: newUser.name } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};


export const LoginUser = async(req : Request, res : Response): Promise<void> => {

    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'supersecret', {
    expiresIn: '7d',
  });
res.json({ message: 'Login successful', token });
};