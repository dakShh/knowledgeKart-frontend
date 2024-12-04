// type Props = {};

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import CreatorLoginForm from '../../components/auth/CreatorLoginForm';

export default function CreatorLogin() {
    const { isLoggedIn } = useAuth();
    if (isLoggedIn()) return <Navigate to="/" />;

    return (
        <div className="flex min-h-screen items-center justify-center  p-4">
            <CreatorLoginForm />
        </div>
    );
}
