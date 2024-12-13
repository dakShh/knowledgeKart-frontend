import { z } from 'zod';

const MAX_FILE_SIZE = 1 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4'];

export const CreateCourseSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(20),
    price: z.string().min(1, { message: 'Please enter the price of the course' }),
    content: z
        .instanceof(FileList)
        .refine((list) => list.length > 0, 'No files selected')
        .refine((list) => list.length <= 5, 'Maximum 5 files allowed')
        .refine(
            (list) => ACCEPTED_TYPES.includes(list?.[0]?.type),
            'Only .jpg, .jpeg, .png and .mp4 formats are supported.'
        ),
    // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 1MB.`),
});

export type CreateCourseSchemaType = z.infer<typeof CreateCourseSchema>;
