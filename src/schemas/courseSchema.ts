import { z } from 'zod';

export const CreateCourseSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(20),
    price: z.string().min(1, { message: 'Please enter the price of the course' }),
});

export type CreateCourseSchemaType = z.infer<typeof CreateCourseSchema>;
