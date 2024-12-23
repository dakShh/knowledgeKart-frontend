import { useParams } from 'react-router-dom';
import NavBar from '../../components/layout/NavBar';
import { cn } from '../../utils/cn';
import { useEffect, useState } from 'react';
import { Course } from '../../types/course';
import { GetCourseById } from '../../services/CourseService';
import { UserData } from '../../types/user';
import CourseDetailCard from '../../components/course/CourseDetailCard';

export default function CoursePage() {
    const { id } = useParams();
    const [course, setCourse] = useState<Course>();
    console.log('course: ', course);
    useEffect(() => {
        async function getCourseDetail() {
            if (id) {
                const response = await GetCourseById(id || '');
                if (response) setCourse(response.data);
            }
        }

        getCourseDetail();
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
                    <CourseDetailCard courseDetail={course} />
                </div>
            </div>

            {/* <div className={cn('max-w-5xl mx-auto mt-20')}>
                {course?.content?.map((c, index) => {
                    return (
                        <div key={index} className={cn('mb-10')}>
                            <div className={cn('mb-10')}>
                                <div className={cn('text-3xl font-extrabold')}>{c.title}</div>
                                <div className={cn('opacity-60')}>{c.description}</div>
                            </div>
                            <video className={cn('mb-5 w-full')} key={index} controls={true}>
                                <source src={c.video} type="video/mp4" />
                            </video>
                        </div>
                    );
                })}
            </div> */}
        </div>
    );
}
