import AddCourseForm from '../../components/course/AddCourseForm';
import { cn } from '../../utils/cn';

export default function AddCourse() {
    return (
        <div className={cn('container mx-auto', 'px-10 my-8')}>
            <div className={cn('text-3xl font-extrabold')}>Add a course</div>
            <div className={cn('my-10')}>
                <AddCourseForm />
            </div>
        </div>
    );
}
