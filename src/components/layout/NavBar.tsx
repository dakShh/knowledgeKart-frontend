import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { cn } from '../../utils/cn';

export default function NavBar() {
    const { isLoggedIn, logoutUser, isCreator } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="navbar bg-neutral-800 shadow-lg md:px-10">
            <div className="mr-5">
                <label htmlFor="my-drawer-2" className="btn btn-accent drawer-button lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="10"
                        height="10"
                        viewBox="0 0 32 32"
                    >
                        <path d="M 4 7 L 4 9 L 28 9 L 28 7 Z M 4 15 L 4 17 L 28 17 L 28 15 Z M 4 23 L 4 25 L 28 25 L 28 23 Z"></path>
                    </svg>
                </label>
            </div>
            <div className="flex-1">
                <div
                    onClick={() => navigate('/')}
                    className={cn('text-2xl font-extrabold', 'cursor-pointer')}
                >
                    Knowledge Kart
                </div>
            </div>
            <div className="flex-none">
                {isLoggedIn() ? (
                    <div className="menu menu-horizontal items-center gap-x-5">
                        {isCreator && (
                            <div
                                onClick={() => navigate('/dashboard')}
                                className="cursor-pointer hover:text-[#cccbcb]/50"
                            >
                                Dashboard
                            </div>
                        )}
                        <button onClick={() => logoutUser()} className={cn('btn btn-sm ')}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <button onClick={() => navigate('/login')} className={cn('btn btn-btn')}>
                        Login
                    </button>
                )}
            </div>
        </div>
    );
}
