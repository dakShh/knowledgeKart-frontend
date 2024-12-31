import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { AddCourseResponse, Course } from '../types/course';

const api = 'http://localhost:8000/api/v1/course/';

export async function FetchAllCourseApi() {
    try {
        const response = await axios.post(api + 'preview');
        return response.data;
    } catch (error) {
        const errMessage = error as AxiosError;
        const err = errMessage.response?.data as { error: string };
        toast.error(err.error ?? '');
    }
}

export async function FetchCreatorCourse(token: string) {
    try {
        const response = await axios.get(api + `course`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        const errMessage = error as AxiosError;
        const err = errMessage.response?.data as { error: string };
        toast.error(err.error ?? '');
    }
}

// Todo: change the token sending method
export async function AddCourse(
    // FormData: AddCourseRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FormData: any,
    token: string
): Promise<AddCourseResponse | void> {
    try {
        const response = await axios.post<AddCourseResponse>(api + 'create', FormData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        const errMessage = error as AxiosError;
        const err = errMessage.response?.data as { message: string };
        console.log('AddCourse error: ', err);
        toast.error(err.message ?? '');
    }
}

export async function GetCourseById(id: string): Promise<{ data: Course } | void> {
    try {
        const response = await axios.get<{ data: Course }>(api + `${id}`);
        return response.data;
    } catch (error) {
        const errMessage = error as AxiosError;
        const err = errMessage.response?.data as { message: string };
        console.log('AddCourse error: ', err);
        toast.error(err.message ?? '');
    }
}

export async function EnrollUser(
    id: string,
    token: string
): Promise<{ status: boolean; message: string } | void> {
    try {
        const response = await axios.get<{ status: boolean; message: string }>(api + `purchase/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        const errMessage = error as AxiosError;
        const err = errMessage.response?.data as { message: string };
        console.log('Enroll error: ', err);
        toast.error(err.message ?? '');
    }
}

export async function checkEnrollmentApi(id: string, token: string): Promise<{ data: boolean } | void> {
    try {
        const response = await axios.get<{ data: boolean }>(api + `checkEnrollment/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        const errMessage = error as AxiosError;
        const err = errMessage.response?.data as { message: string };
        console.log('Error checking enrollment: ', err);
        toast.error(err.message ?? '');
    }
}
