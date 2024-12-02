import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

type ProtectedRouteProps = { children: React.ReactNode };

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn()) return <Navigate to="/login" />;

    return children;
};
