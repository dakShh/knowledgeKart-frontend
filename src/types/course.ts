import { UserData } from './user';

export interface Course {
    _id: string;
    title: string;
    description: string;
    adminId: string | UserData;
    price: string;
    content: {
        title: string;
        description: string;
        video: string;
    }[];
}

export interface CreateCourseFormData {
    title: string;
    description: string;
    price: string;
}

export interface CourseApiResponse {
    status: boolean;
    data: Course[];
}

// Request type
export interface AddCourseRequest {
    title: string;
    description: string;
    price: string;
}

export interface AddCourseResponse {
    status: boolean;
    message: string;
    course: Course;
}
