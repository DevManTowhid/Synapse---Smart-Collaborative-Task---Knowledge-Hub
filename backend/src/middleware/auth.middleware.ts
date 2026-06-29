import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protect = (req: Request, res: Response, next: NextFunction): void => {
const token = req.headers.authorization?.split(' ')[1]; // Extract "Bearer <token>"

 if (!token) {
  res.status(401).json({ error: 'Unauthorized: No token provided' });
  return;
 }

 try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
  (req as any).user = decoded; // Attach user info to the request
  next();
 } catch (error) {
  res.status(403).json({ error: 'Forbidden: Invalid token' });
 }
};

