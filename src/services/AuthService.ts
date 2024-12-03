import axios, { AxiosError } from 'axios';
import { LoginUserApiResponse, UserRegisterData } from '../types/user';
import { ApiResponse } from '../types/common';
import toast from 'react-hot-toast';

const api = 'http://localhost:8000/api/v1/user/';

export async function RegisterUserAPI(UserData: UserRegisterData) {
    try {
        const response = await axios.post<ApiResponse>(api + 'register', {
            firstName: UserData.firstName,
            lastName: UserData.lastName,
            email: UserData.email,
            password: UserData.password,
        });

        if (!response?.data?.status) {
            console.error(response.data.message);
        }

        return response.data;
    } catch (error) {
        const errMessage = error as AxiosError;
        console.log('error:  ', errMessage?.response?.data || 'error registering');
    }
}

export async function LoginUserAPI(UserData: {
    email: string;
    password: string;
}): Promise<LoginUserApiResponse | void> {
    try {
        const response = await axios.post(api + 'login', {
            email: UserData.email,
            password: UserData.password,
        });
        return response.data;
    } catch (error) {
        const errMessage = error as AxiosError;
        const err = errMessage.response?.data as { error: string };
        toast.error(err.error ?? '');
    }
}
