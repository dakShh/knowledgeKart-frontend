import { Navigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import { useAuth } from '../../context/useAuth';

export default function SignUp() {
    const { isLoggedIn } = useAuth();
    if (isLoggedIn()) return <Navigate to="/" />;
    return (
        <div className="flex min-h-screen items-center justify-center  p-4">
            <RegisterForm />
        </div>
    );
}
