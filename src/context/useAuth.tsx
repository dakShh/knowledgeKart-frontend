import React, { createContext, useEffect, useState } from 'react';
import { UserData, UserProfileToken } from '../types/user';
import { useNavigate } from 'react-router-dom';
import { LoginUserAPI } from '../services/AuthService';
import { AxiosError } from 'axios';

type AuthContextType = {
    user: UserData | null;
    token: string | null;
    loginUser: (UserData: { email: string; password: string }) => void;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: Props) {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>('' as string);
    const [user, setUser] = useState<UserData | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);

    async function loginUser(UserData: { email: string; password: string }) {
        try {
            const res = await LoginUserAPI(UserData);

            if (res?.user && res?.token) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('user', JSON.stringify(res?.user));
                setToken(res?.token);
                setUser(res?.user);
                navigate('/');
            }
        } catch (error) {
            const errMessage = error as AxiosError;
            console.error('error: ', errMessage?.response?.data ?? 'Error Logging in');
        }
    }

    function logoutUser() {
        setUser(null);
        setToken('');
        navigate('/');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
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
        }

        setIsReady(true);
    }, []);

    return (
        <AuthContext.Provider value={{ token, user, loginUser, logoutUser, isLoggedIn }}>
            {isReady ? children : null}
        </AuthContext.Provider>
    );
}
export const useAuth = () => React.useContext(AuthContext);
