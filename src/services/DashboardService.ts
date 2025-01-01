import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const api = 'http://localhost:8000/api/v1/dashboard/';

export async function GetDashboardDataApi(token: string) {
    try {
        const response = await axios.get(api + `data`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        const errMessage = error as AxiosError;
        const err = errMessage.response?.data as { error: string };
        toast.error(err.error ?? '');
    }
}
