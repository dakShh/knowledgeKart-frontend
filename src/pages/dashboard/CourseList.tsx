import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import { FetchCreatorCourse } from '../../services/CourseService';
import { useAuth } from '../../context/useAuth';
import { Course } from '../../types/course';
import CourseDetailModal from '../../components/dashboard/CourseDetailModal';

export default function CourseList() {
    const { token } = useAuth();

    const [courseList, setCourseList] = useState<Course[]>();

    useEffect(() => {
        async function fetchList() {
            const response = await FetchCreatorCourse(token || '');
            if (response) {
                setCourseList(response.data);
            }
        }

        fetchList();
    }, []);

    return (
        <div className={cn('')}>
            <div className={cn('w-full text-3xl font-extrabold px-10 my-10')}>Course List</div>
            <div className="overflow-x-auto w-full px-10">
                <table className="table">
                    <thead>
                        <tr className="bg-secondary font-extrabold text-md">
                            <th>Sr.No.</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>No. of Students</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseList?.map((course, index) => {
                            return (
                                <tr
                                    role="button"
                                    className="border-b border-white/10 hover:bg-secondary/20  cursor-pointer"
                                >
                                    <td className="max-w-[20px]">{index + 1}</td>
                                    <td className="max-w-20">
                                        <div className="flex items-center gap-3">
                                            {/* <div className="avatar">
                                                <div className=" h-12 w-20">
                                                    <img
                                                        src={course.thumbnail}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                </div>
                                            </div> */}
                                            <div>
                                                <div className="">{course.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={cn('max-w-[200px] overflow-hidden')}>
                                        {course.description || ''}
                                    </td>
                                    <td>{course.noOfStudents ?? 0}</td>
                                    <td>{`$${course.price}`}</td>
                                    {/* <th>
                                        <button className="btn btn-primary btn-xs">Edit</button>
                                    </th> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <CourseDetailModal />
            </div>
        </div>
    );
}
