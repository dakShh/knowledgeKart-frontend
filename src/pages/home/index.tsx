import { useEffect, useState } from 'react';
import NavBar from '../../components/layout/NavBar';
import { cn } from '../../utils/cn';
import { FetchAllCourseApi } from '../../services/CourseService';
import { Course, CourseApiResponse } from '../../types/course';
import CourseCard from '../../components/course/CourseCard';
import Hero from '../../components/Hero';

export default function HomePage() {
    const [courses, setCourses] = useState<Course[]>([]);
    useEffect(() => {
        async function fetchAllCourse() {
            const response: CourseApiResponse = await FetchAllCourseApi();
            if (response.status) {
                setCourses(response?.data);
            }
        }

        fetchAllCourse();
    }, []);
    return (
        <div className={cn('container mx-auto')}>
            <NavBar />
            <Hero />
            <div className="flex px-10 my-10">
                <div className={cn('grid grid-cols-4 gap-6', '')}>
                    {courses?.map((course, index) => {
                        return <CourseCard courseInfo={course} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
}
