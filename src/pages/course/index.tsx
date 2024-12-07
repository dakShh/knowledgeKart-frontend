import { useParams } from 'react-router-dom';
import NavBar from '../../components/layout/NavBar';
import { cn } from '../../utils/cn';
import { useEffect, useState } from 'react';
import { Course } from '../../types/course';
import { GetCourseById } from '../../services/CourseService';
import { UserData } from '../../types/user';

export default function CoursePage() {
    const { id } = useParams();
    const [course, setCourse] = useState<Course>();

    useEffect(() => {
        async function fetchAllCourse() {
            if (id) {
                const response = await GetCourseById(id || '');
                console.log('response: ', response);
                if (response) setCourse(response.data);
            }
        }

        fetchAllCourse();
    }, []);
    return (
        <div className={cn('container mx-auto')}>
            <NavBar />
            <div className={cn('max-w-3xl mx-auto mt-20')}>
                <div className={cn('text-5xl font-extrabold mb-2')}>{course?.title}</div>
                <div className={cn('text-lg mb-5')}>
                    {(course?.adminId as UserData)?.firstName} {(course?.adminId as UserData)?.lastName}
                </div>
                <div className={cn('text-lg text-white/40 font-thin')}>{course?.description}</div>
            </div>
        </div>
    );
}
