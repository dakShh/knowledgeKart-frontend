import { UserData } from './user';

export interface Course {
    title: string;
    description: string;
    adminId: string | UserData;
    price: string;
}

export interface CourseApiResponse {
    status: boolean;
    data: Course[];
}
