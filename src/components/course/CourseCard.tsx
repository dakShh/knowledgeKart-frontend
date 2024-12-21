import { useNavigate } from 'react-router-dom';
import { Course } from '../../types/course';
import { UserData } from '../../types/user';
import { cn } from '../../utils/cn';

export default function CourseCard({ courseInfo }: { courseInfo: Course }) {
    const navigate = useNavigate();

    return (
        <div className="card bg-[#e7e7e7] text-base-100 shadow-xl">
            <figure>
                <img src={courseInfo?.thumbnail || ''} alt="Shoes" />
            </figure>
            <div className="card-body gap-0">
                <h2
                    onClick={() => navigate(`/course/${courseInfo._id}`)}
                    className={cn('card-title mb-1 text-2xl font-bold', 'cursor-pointer hover:underline ')}
                >
                    {courseInfo.title}
                </h2>
                <div className={cn('text-base-100/60 flex items-start gap-x-1')}>
                    <div className={cn('w-6 h-6 bg-neutral-700 rounded-full')}></div>
                    <div className="text-sm">
                        {(courseInfo?.adminId as UserData)?.firstName || ''}{' '}
                        {(courseInfo?.adminId as UserData)?.lastName || ''}
                    </div>
                </div>
                <p className={cn('text-base-100/60 text-xs items-start py-4 overflow-hidden')}>
                    {courseInfo.description}
                </p>
                <div className="card-actions justify-between">
                    <div className={cn('text-xl text-base-100 font-extrabold')}>${courseInfo.price}/-</div>
                    <button className="btn btn-base-300">Buy Now</button>
                </div>
            </div>
        </div>
    );
}
