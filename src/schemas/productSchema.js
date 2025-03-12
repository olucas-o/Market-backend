import { z } from 'zod';
export const productsSchema = z.object({
    productName: z.string().min(3,'Name is requiered'),
    description: z.string().min(5,'Invalid description'),
    price: z.number().min(0, "Price must be a positive number"),
    productClass: z.string().min(1,'Invalid class')
});