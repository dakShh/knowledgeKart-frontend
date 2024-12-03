import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserProfileToken } from '../types/user';
import { useNavigate } from 'react-router-dom';
import { RegisterSchemaType } from '../schemas/authSchema';
import { LoginUserAPI, RegisterUserAPI } from '../services/AuthService';
import { AxiosError } from 'axios';

type AuthContextType = {
    user: UserProfileToken | null;
    token: string | null;
    // registerUser: (UserData: RegisterSchemaType) => void;
    // registerUser: (firstName: string, lastName: string, email: string, password: string) => void;
    loginUser: (UserData: { email: string; password: string }) => void;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: Props) {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>('' as string);
    const [user, setUser] = useState<UserProfileToken | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);
    async function loginUser(UserData: { email: string; password: string }) {
        try {
            const res = await LoginUserAPI(UserData);
            if (res) {
                localStorage.setItem('token', res?.data?.token);
                localStorage.setItem('user', JSON.stringify(res?.data));
                setToken(res?.data?.token);
                setUser(res?.data);
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
