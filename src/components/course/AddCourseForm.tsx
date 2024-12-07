import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateCourseSchema, CreateCourseSchemaType } from '../../schemas/courseSchema';
import { cn } from '../../utils/cn';
import { AddCourse } from '../../services/CourseService';
import { useAuth } from '../../context/useAuth';
import toast from 'react-hot-toast';

export default function AddCourseForm() {
    const { token } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateCourseSchemaType>({ resolver: zodResolver(CreateCourseSchema) });

    const onSubmit: SubmitHandler<CreateCourseSchemaType> = async (data) => {
        const response = await AddCourse(data, token || '');

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

                    {errors.title && (
                        <span className={cn('text-error text-sm')}>{errors.title.message}</span>
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

                    {errors.description && (
                        <span className={cn('text-error text-sm')}>{errors.description.message}</span>
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

                    {errors.price && (
                        <span className={cn('text-error text-sm')}>{errors.price.message}</span>
                    )}
                </label>

                <div className={cn('w-full')}>
                    <button type="submit" className="mt-5 btn btn-primary w-full rounded-full">
                        {/* {isLoading ? <span className="loading loading-bars loading-sm"></span> : `Login`} */}
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
