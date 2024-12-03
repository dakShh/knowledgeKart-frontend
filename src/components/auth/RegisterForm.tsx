import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

import { useForm, SubmitHandler } from 'react-hook-form';

// Schema
import { RegisterSchema, RegisterSchemaType } from '../../schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';

// Context
import { RegisterUserAPI } from '../../services/AuthService';
import { ApiResponse } from '../../types/common';

export default function RegisterForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

    const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
        const response = (await RegisterUserAPI(data)) as ApiResponse;
        if (response?.status) {
            navigate('/login');
        }
    };

    return (
        <div
            className={cn(
                'bg-secondary/20 max-w-md rounded-3xl w-full',
                'border border-secondary/20',
                'py-6 px-6'
            )}
        >
            <div className={cn('text-center mb-6')}>
                <h2 className={cn('text-3xl font-extrabold')}>Register</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col space-y-2')}>
                <div className={cn('grid grid-cols-2 gap-x-2')}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text ">Firstname</span>
                        </div>

                        <input
                            className={cn('input input-bordered focus:outline-none')}
                            placeholder="John"
                            {...register('firstName')}
                        />
                        {errors.firstName && (
                            <span className={cn('text-error text-sm')}>{errors.firstName.message}</span>
                        )}
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text ">Lastname</span>
                        </div>

                        <input
                            className={cn('input input-bordered focus:outline-none')}
                            placeholder="Doe"
                            {...register('lastName')}
                        />
                        {errors.lastName && (
                            <span className={cn('text-error text-sm')}>{errors.lastName.message}</span>
                        )}
                    </label>
                </div>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text ">Email</span>
                    </div>

                    <input
                        className={cn('input input-bordered focus:outline-none')}
                        placeholder="example@provider.com"
                        {...register('email')}
                    />
                    {errors.email && (
                        <span className={cn('text-error text-sm')}>{errors.email.message}</span>
                    )}
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>

                    <input
                        className={cn('input input-bordered focus:outline-none')}
                        placeholder="*******"
                        type="password"
                        {...register('password')}
                    ></input>
                    {errors.password && (
                        <span className={cn('text-error text-sm')}>{errors.password.message}</span>
                    )}
                </label>
                <div className={cn('w-full')}>
                    <button type="submit" className="mt-5 btn btn-primary w-full rounded-full">
                        Register
                    </button>
                </div>
            </form>
            <div className={cn('text-center')}>
                <div className={cn('mt-2')}>
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/login')}
                        className="link cursor-pointer hover:no-underline link-info underline-offset-2"
                    >
                        Login here
                    </span>{' '}
                </div>
            </div>
        </div>
    );
}
