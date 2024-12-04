import React, { createContext, useEffect, useState } from 'react';
import { UserData } from '../types/user';
import { useNavigate } from 'react-router-dom';
import { LoginUserAPI, LoginCreatorAPI } from '../services/AuthService';
import toast from 'react-hot-toast';
import { sleep } from '../utils/helper';

type AuthContextType = {
    user: UserData | null;
    token: string | null;
    login: (UserData: { email: string; password: string }, isCreator: boolean) => void;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
    isLoading: boolean;
    isCreator: boolean;
};

type Props = { children: React.ReactNode };

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: Props) {
    const navigate = useNavigate();

    const [token, setToken] = useState<string | null>('' as string);
    const [user, setUser] = useState<UserData | null>(null);

    const [isReady, setIsReady] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCreator, setIsCreator] = useState<boolean>(false);

    async function login(formData: { email: string; password: string }, isCreatorFlag: boolean) {
        try {
            const loginFunction = isCreatorFlag ? LoginCreatorAPI : LoginUserAPI;
            const res = await loginFunction(formData);
            setIsLoading(true);
            await sleep(1200);

            if (res?.token && res?.user) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('user', JSON.stringify(res?.user));
                localStorage.setItem('isCreator', isCreatorFlag.toString());
                setToken(res?.token);
                setUser(res?.user);
                setIsCreator(isCreatorFlag);
                console.log('isCreatorFlag: ', isCreatorFlag);
                // navigate(isCreatorFlag ? '/dashboard' : '/');
                // navigate('/dashboard');
                toast('Logged in!🚀');
            } else {
                toast.error('Error logging in, Please try again later');
            }
        } catch (error) {
            console.error('error: ', error);
        } finally {
            setIsLoading(false);
        }
    }

    function logoutUser() {
        setUser(null);
        setToken('');
        navigate('/login');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('isCreator');
    }

    function isLoggedIn() {
        return !!user && !!token;
    }

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            setIsCreator(localStorage.getItem('isCreator') == 'true');
        }
        setIsReady(true);
    }, []);

    return (
        <AuthContext.Provider value={{ token, user, login, logoutUser, isLoggedIn, isLoading, isCreator }}>
            {isReady ? children : null}
        </AuthContext.Provider>
    );
}
export const useAuth = () => React.useContext(AuthContext);
