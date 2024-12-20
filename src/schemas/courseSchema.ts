import { z } from 'zod';

// const MAX_FILE_SIZE = 1 * 1024 * 1024;
// const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4'];

export const CreateCourseSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(20),
    price: z.string().min(1, { message: 'Please enter the price of the course' }),
    thumbnail: z
        .instanceof(FileList)
        .refine(
            (file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file[0]?.type),
            'Only .jpg .jpeg .png formats are supported'
        ),
    content: z
        .array(
            z.object({
                title: z.string().min(3),
                description: z.string().min(3),
                video: z
                    .instanceof(FileList)
                    .nullable()
                    .refine((file) => file?.length == 1, 'Please upload a video')
                    .refine((file) => file?.[0].type.startsWith('video/'), 'Only video files are allowed'),
            })
        )
        .min(1, 'At least one content should be added'),
});

export type CreateCourseSchemaType = z.infer<typeof CreateCourseSchema>;
