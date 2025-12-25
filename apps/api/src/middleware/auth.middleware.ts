import { Request, Response, NextFunction } from 'express';
import { AppError, ErrorCode } from '@repo/errors';

const API_KEY = process.env.INTERNAL_API_KEY || 'gemini-secret-key';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
    throw new AppError(ErrorCode.UNAUTHORIZED, 'Invalid or missing API Key', 401);
  }

  next();
};
