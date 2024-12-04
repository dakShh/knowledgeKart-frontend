import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

type ProtectedRouteProps = { children: React.ReactNode };

export const CreatorProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isCreator } = useAuth();
    if (!isCreator) {
        return <Navigate to="/" />;
    }

    return children;
};
