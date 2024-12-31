import { useParams } from 'react-router-dom';
import NavBar from '../../components/layout/NavBar';
import { cn } from '../../utils/cn';
import { useEffect, useState } from 'react';
import { Course } from '../../types/course';
import { GetCourseById, checkEnrollmentApi } from '../../services/CourseService';
import CourseDetailCard from '../../components/course/CourseDetailCard';
import { useAuth } from '../../context/useAuth';

import { Video } from 'lucide-react';

export default function CoursePage() {
    const { id: courseId } = useParams();
    const { token } = useAuth();

    const [course, setCourse] = useState<Course>();
    const [isEnrolled, setIsEnrolled] = useState<boolean>(false);

    useEffect(() => {
        async function getCourseDetail(courseId: string) {
            const response = await GetCourseById(courseId || '');
            if (response) setCourse(response.data);
        }

        async function checkEnrollment(courseId: string) {
            const response = await checkEnrollmentApi(courseId || '', token || '');
            if (response && response.data) {
                // const course = await GetCourseById(courseId || '');
                // setCourse(course?.data);
                setIsEnrolled(true);
            }
        }

        if (courseId) {
            getCourseDetail(courseId);
            checkEnrollment(courseId);
        }
    }, []);
    return (
        <div className={cn('container mx-auto')}>
            <NavBar />
            <div className={cn('bg-blue-800 py-8', 'flex items-center', 'min-h-[350px]')}>
                <div className={cn('max-w-5xl w-full mx-auto ', 'relative', '')}>
                    <div>
                        <div className={cn('text-5xl text-info  font-extrabold mb-2')}>{course?.title}</div>
                        <div className={cn('text-lg text-info font-thin')}>{course?.description}</div>
                    </div>
                    <CourseDetailCard courseDetail={course} isEnrolled={isEnrolled} />
                </div>
            </div>

            <div className={cn('max-w-5xl mx-auto mt-20')}>
                <div className={cn('mb-5')}>
                    <div className={cn('text-4xl font-extrabold')}>Course Overview</div>
                </div>
                <div className={cn('max-w-2xl ')}>
                    {course?.content?.map((c, index) => {
                        return (
                            <div key={index} className={cn('bg-primary', 'rounded px-5 py-2 mb-6')}>
                                <div className={cn('mb-4')}>
                                    <div className={cn('flex gap-x-2')}>
                                        <div className={cn('text-xl font-extrabold pt-1')}>{`${
                                            index + 1
                                        }.`}</div>
                                        <div>
                                            <div className={cn('text-2xl font-extrabold')}>{c.title}</div>
                                            <div className={cn('opacity-60')}>{c.description}</div>
                                        </div>
                                        <div className="ml-auto">
                                            <Video />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
