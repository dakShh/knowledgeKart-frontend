import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

export default function RegisterForm() {
    const navigate = useNavigate();
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

            <form className={cn('flex flex-col space-y-2')}>
                <div className={cn('grid grid-cols-2 gap-x-2')}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text ">First Name</span>
                        </div>

                        <input
                            className={cn('input input-bordered focus:outline-none')}
                            placeholder="John"
                        />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text ">Last Name</span>
                        </div>

                        <input
                            className={cn('input input-bordered focus:outline-none')}
                            placeholder="Doe"
                        />
                    </label>
                </div>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text ">Email</span>
                    </div>

                    <input
                        className={cn('input input-bordered focus:outline-none')}
                        placeholder="example@provider.com"
                    />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>

                    <input
                        className={cn('input input-bordered focus:outline-none')}
                        placeholder="*******"
                        type="password"
                    ></input>
                </label>
                <div className={cn('w-full')}>
                    <button className="mt-5 btn btn-primary w-full rounded-full">Register</button>
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
