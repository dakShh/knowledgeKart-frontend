import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateCourseSchema, CreateCourseSchemaType } from '../../schemas/courseSchema';
import { cn } from '../../utils/cn';
import { AddCourse } from '../../services/CourseService';
import { useAuth } from '../../context/useAuth';
import toast from 'react-hot-toast';
import AddCourseContent from './AddCourseContent';

export default function AddCourseForm() {
    const { token } = useAuth();
    const { register, handleSubmit, reset, formState } = useForm<CreateCourseSchemaType>({
        resolver: zodResolver(CreateCourseSchema),
    });

    const onSubmit: SubmitHandler<CreateCourseSchemaType> = async (data) => {
        const d = new FormData();
        d.append('title', data.title);
        d.append('description', data.description);
        d.append('price', data.price);

        d.append('content', data.content[0]);
        d.append('content', data.content[1]);

        const response = await AddCourse(d, token || '');

        if (response) {
            toast(response.message);
            reset();
        }
    };

    return (
        <div className={cn('max-w-xl w-full')}>
            <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col space-y-2')}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text ">Title</span>
                    </div>

                    <input
                        className={cn('input input-bordered focus:outline-none')}
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

                    <input
                        className={cn('input input-bordered focus:outline-none')}
                        placeholder=""
                        type="textarea"
                        {...register('description')}
                    ></input>

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
                        className={cn('input input-bordered focus:outline-none')}
                        placeholder=""
                        {...register('price')}
                    ></input>

                    {formState.errors.price && (
                        <span className={cn('text-error text-sm')}>{formState.errors.price.message}</span>
                    )}
                </label>

                <AddCourseContent
                    register={register}
                    error={formState?.errors.content?.message as string}
                />

                <div className={cn('w-full')}>
                    <button type="submit" className="mt-5 btn btn-primary w-full rounded-full">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
