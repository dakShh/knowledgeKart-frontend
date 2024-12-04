import axios, { AxiosError } from 'axios';
import { LoginApiResponse, UserRegisterData } from '../types/user';
import { ApiResponse } from '../types/common';
import toast from 'react-hot-toast';

const userApi = 'http://localhost:8000/api/v1/user/';
const adminApi = 'http://localhost:8000/api/v1/admin/';

export async function RegisterUserAPI(UserData: UserRegisterData, isCreator: boolean) {
    try {
        const api = isCreator ? adminApi : userApi;
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
}): Promise<LoginApiResponse | void> {
    try {
        const response = await axios.post(userApi + 'login', {
            email: UserData.email,
            password: UserData.password,
        });
        return response.data;
    } catch (error) {
        const errMessage = error as AxiosError;
        const err = errMessage.response?.data as { message: string };
        toast.error(err.message ?? '');
    }
}

export async function LoginCreatorAPI(UserData: {
    email: string;
    password: string;
}): Promise<LoginApiResponse | void> {
    try {
        const response = await axios.post(adminApi + 'login', {
            email: UserData.email,
            password: UserData.password,
        });
        return response.data;
    } catch (error) {
        const errMessage = error as AxiosError;
        const err = errMessage.response?.data as { message: string };
        toast.error(err.message ?? '');
    }
}
