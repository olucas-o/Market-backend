import { z } from 'zod';

export const IdSchema = z.object({
    Id: z.number().int().positive('User ID must be positive and integer'),
});