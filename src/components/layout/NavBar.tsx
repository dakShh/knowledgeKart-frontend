import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { cn } from '../../utils/cn';

export default function NavBar() {
    const { isLoggedIn, logoutUser } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="navbar bg-neutral-800 shadow-lg">
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
                    <button onClick={() => logoutUser()} className={cn('btn btn-sm ')}>
                        Logout
                    </button>
                ) : (
                    <button onClick={() => navigate('/login')} className={cn('btn btn-btn')}>
                        Login
                    </button>
                )}
            </div>
        </div>
    );
}
