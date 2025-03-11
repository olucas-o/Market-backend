import { z } from 'zod';
export const userSchema = z.object({
    userName: z.string().min(3,'Username is requiered'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6,'Can be least them 6 characters long')
});