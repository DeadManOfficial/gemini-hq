import { z } from 'zod';

// Shared Schemas
export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

export const UUIDSchema = z.string().uuid();

// Base Entity Schema (Timestamp fields)
export const EntitySchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Pagination = z.infer<typeof PaginationSchema>;

// Re-export all schemas
export * from './auth.schema';
export * from './mission.schema';
