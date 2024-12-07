import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import { FetchAllCourseApi, FetchCreatorCourse } from '../../services/CourseService';
import { useAuth } from '../../context/useAuth';
import { Course } from '../../types/course';

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
        console.log('courseList', courseList);
    }, []);

    return (
        <div className={cn('')}>
            <div className={cn('w-full text-3xl font-extrabold px-10 my-10')}>Course List</div>
            <div className="overflow-x-auto w-full px-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>

                            <th>Sr.No.</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {courseList?.map((course, index) => {
                            return (
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td className="max-w-sm">{index + 1}</td>
                                    <td className="max-w-20">
                                        <div className="flex items-center gap-3">
                                            {/* <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12 bg-white"></div>
                                            </div> */}
                                            <div>
                                                {/* <div className="font-bold">Hart Hagerty</div>
                                                <div className="text-sm opacity-50">United States</div> */}
                                                {course.title}
                                            </div>
                                        </div>
                                    </td>
                                    <td className={cn('max-w-[200px] overflow-hidden')}>
                                        {course.description || ''}
                                    </td>
                                    <td>{`$${course.price}`}</td>
                                    <th>
                                        <button className="btn btn-primary btn-xs">Edit</button>
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
