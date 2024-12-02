import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserProfileToken } from '../types/user';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
    user: UserProfileToken | null;
    token: string | null;
    registerUser: (firstName: string, lastName: string, email: string, password: string) => void;
    loginUser: (email: string, password: string) => void;
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

    async function registerUser(firstName: string, lastName: string, email: string, password: string) {}

    async function loginUser(email: string, password: string) {}

    async function logoutUser() {}

    function isLoggedIn() {
        return !!user && !!token;
    }

    useEffect(() => {}, []);

    return (
        <AuthContext.Provider value={{ token, user, registerUser, loginUser, logoutUser, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => React.useContext(AuthContext);
