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
                if (response) setCourse(response.data);
            }
        }

        fetchAllCourse();
    }, []);
    return (
        <div className={cn('container mx-auto')}>
            <NavBar />
            <div className={cn('max-w-3xl mx-auto mt-20', 'flex flex-col space-y-10')}>
                <div>
                    <div className={cn('text-5xl font-extrabold mb-2')}>{course?.title}</div>
                    <div className={cn('text-lg mb-5')}>
                        {(course?.adminId as UserData)?.firstName} {(course?.adminId as UserData)?.lastName}
                    </div>
                    <div className={cn('text-lg text-white/40 font-thin')}>{course?.description}</div>
                </div>
            </div>

            <div className={cn('max-w-4xl mx-auto mt-20')}>
                {course?.content?.map((videoUrl, index) => {
                    return (
                        <video className={cn('mb-5')} key={index} controls={true}>
                            <source src={videoUrl} type="video/mp4" />
                        </video>
                    );
                })}
            </div>
        </div>
    );
}
