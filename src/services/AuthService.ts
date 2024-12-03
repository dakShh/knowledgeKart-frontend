import axios, { AxiosError } from 'axios';
import { LoginUserApiResponse, UserProfile, UserProfileToken } from '../types/user';
import { ApiResponse } from '../types/common';

const api = 'http://localhost:8000/api/v1/user/';

export async function RegisterUserAPI(UserData: UserProfile) {
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

export async function LoginUserAPI(UserData: { email: string; password: string }) {
    try {
        const response = await axios.post<LoginUserApiResponse>(api + 'login', {
            email: UserData.email,
            password: UserData.password,
        });

        return response?.data;
    } catch (error) {
        const errMessage = error as AxiosError;
        console.log('error:  ', errMessage?.response?.data || 'error logging in');
    }
}
