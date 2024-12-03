import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginSchema, LoginSchemaType } from '../../schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '../../context/useAuth';

export default function LoginForm() {
    const navigate = useNavigate();
    const { loginUser, isLoading } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

    const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
        loginUser(data);
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
                <h2 className={cn('text-3xl font-extrabold')}>Login</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col space-y-2')}>
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
                <div className={cn('w-full flex')}>
                    <div className="text-sm link-info  ml-auto italic">Forgot Password?</div>
                </div>
                <div className={cn('w-full')}>
                    <button type="submit" className="mt-5 btn btn-primary w-full rounded-full">
                        {isLoading ? <span className="loading loading-bars loading-sm"></span> : `Login`}
                    </button>
                </div>
            </form>
            <div className={cn('text-center')}>
                <div className={cn('mt-2')}>
                    Dont have an account?{' '}
                    <span
                        onClick={() => navigate('/signup')}
                        className="link cursor-pointer hover:no-underline link-info underline-offset-2"
                    >
                        Register here
                    </span>{' '}
                </div>
            </div>
        </div>
    );
}
