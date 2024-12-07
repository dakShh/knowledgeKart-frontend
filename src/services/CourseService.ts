import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { AddCourseRequest, AddCourseResponse } from '../types/course';

const api = 'http://localhost:8000/api/v1/course/';

export async function FetchAllCourseApi() {
    try {
        const response = await axios.get(api + 'preview');
        return response.data;
    } catch (error) {
        const errMessage = error as AxiosError;
        const err = errMessage.response?.data as { error: string };
        toast.error(err.error ?? '');
    }
}

// Todo: change the token sending method
export async function AddCourse(
    FormData: AddCourseRequest,
    token: string
): Promise<AddCourseResponse['data'] | void> {
    try {
        const response = await axios.post<AddCourseResponse['data']>(api + 'create', FormData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('AddCourse: ', response);
        return response.data;
    } catch (error) {
        const errMessage = error as AxiosError;
        const err = errMessage.response?.data as { message: string };
        console.log('AddCourse error: ', err);
        toast.error(err.message ?? '');
    }
}
