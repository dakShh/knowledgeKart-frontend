import { useAuth } from '../../context/useAuth';
import { cn } from '../../utils/cn';

export default function HomePage() {
    const { isLoggedIn, logoutUser } = useAuth();
    return (
        <div className={cn('container mx-auto')}>
            <div className={cn('flex justify-between items-center w-full my-5 px-10')}>
                <div>KnowledgeKart</div>
                {isLoggedIn() ? (
                    <button onClick={() => logoutUser()} className={cn('btn btn-primary')}>
                        Logout
                    </button>
                ) : (
                    <button className={cn('btn btn-primary')}>Login</button>
                )}
            </div>
            this is a home page
        </div>
    );
}
