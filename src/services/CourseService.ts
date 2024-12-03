import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

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
