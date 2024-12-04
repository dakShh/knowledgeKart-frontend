import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { cn } from '../../utils/cn';

export default function NavBar() {
    const { isLoggedIn, logoutUser, isCreator } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="navbar bg-neutral-800 shadow-lg px-10">
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
