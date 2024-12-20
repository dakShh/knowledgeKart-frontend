import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import { CreateCourseSchema, CreateCourseSchemaType } from '../../schemas/courseSchema';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/useAuth';
import toast from 'react-hot-toast';
import AddCourseContent from './AddCourseContent';
import { AddCourse } from '../../services/CourseService';
import { useState } from 'react';

export default function AddCourseForm() {
    const { token } = useAuth();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState, control } = useForm<CreateCourseSchemaType>({
        resolver: zodResolver(CreateCourseSchema),
        defaultValues: {
            content: [
                {
                    title: '',
                    description: '',
                    video: undefined,
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'content',
    });

    const onSubmit: SubmitHandler<CreateCourseSchemaType> = async (data) => {
        const d = new FormData();
        d.append('title', data.title);
        d.append('description', data.description);
        d.append('price', data.price);

        d.append('thumbnail', data.thumbnail[0]);

        data.content.forEach((contentItem, index) => {
            d.append(`content[${index}][title]`, contentItem.title);
            d.append(`content[${index}][description]`, contentItem.description);

            if (contentItem.video) {
                d.append(`content[${index}][file]`, contentItem.video[0]);
            }
        });

        setIsLoading(true);
        const response = await AddCourse(d, token || '');

        if (response) {
            toast(response.message);
            reset();
        }
        setIsLoading(false);
    };

    return (
        <div className={cn('max-w-xl w-full')}>
            <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col space-y-2')}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text ">Title</span>
                    </div>

                    <input
                        className={cn('input input-sm input-bordered focus:outline-none')}
                        placeholder=""
                        {...register('title')}
                    />

                    {formState.errors.title && (
                        <span className={cn('text-error text-sm')}>{formState.errors.title.message}</span>
                    )}
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Description</span>
                    </div>

                    <textarea
                        className="textarea textarea-bordered focus:outline-none"
                        placeholder=""
                        {...register('description')}
                    ></textarea>

                    {formState.errors.description && (
                        <span className={cn('text-error text-sm')}>
                            {formState.errors.description.message}
                        </span>
                    )}
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Price</span>
                    </div>

                    <input
                        className={cn('input input-bordered input-sm text-sm focus:outline-none')}
                        placeholder=""
                        {...register('price')}
                    ></input>

                    {formState.errors.price && (
                        <span className={cn('text-error text-sm')}>{formState.errors.price.message}</span>
                    )}
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Thumbnail</span>
                    </div>

                    <input
                        type="file"
                        className="file-input file-input-bordered file-input-secondary file-input-sm  focus:outline-none w-full max-w-xs"
                        {...register('thumbnail')}
                    />

                    {formState.errors.thumbnail && (
                        <span className={cn('text-error text-sm')}>
                            {formState.errors.thumbnail.message}
                        </span>
                    )}
                </label>

                <AddCourseContent
                    register={register}
                    error={''}
                    fields={fields}
                    append={append}
                    remove={remove}
                    // TODO: HANDLE ERROR VALUES FOR CONTENT
                    // error={formState?.errors.content?.message as string}
                />

                <div className={cn('w-full')}>
                    <button type="submit" className="mt-5 btn btn-primary w-full rounded-full">
                        {isLoading ? <span className="loading loading-bars loading-sm"></span> : 'Add'}
                    </button>
                </div>
            </form>
        </div>
    );
}
