// type Props = {};

import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { useAuth } from '../../context/useAuth';

const Login = () => {
    const { isLoggedIn } = useAuth();
    if (isLoggedIn()) return <Navigate to="/" />;

    return (
        <div className="flex min-h-screen items-center justify-center  p-4">
            <LoginForm />
        </div>
    );
};

export default Login;
