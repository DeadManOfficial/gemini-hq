import { Request, Response, NextFunction } from 'express';
import { AppError, ErrorCode } from '@repo/errors';
import { logger } from '@repo/logger';
import { ApiResponse } from '@repo/types';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  
  // Log based on severity
  if (err instanceof AppError && err.statusCode < 500) {
    logger.warn({ err, reqId: req.headers['x-request-id'] }, `[${err.code}] ${err.message}`);
  } else {
    logger.error({ err, reqId: req.headers['x-request-id'] }, 'Unhandled System Error');
  }

  const response = {
    success: false as const,
    error: err.message || 'Internal System Error',
    errorCode: err.code || ErrorCode.INTERNAL_ERROR,
    timestamp
  };

  res.status(err.statusCode || 500).json(response);
};
