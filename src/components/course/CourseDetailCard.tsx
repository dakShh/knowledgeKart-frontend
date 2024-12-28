import { Course } from '../../types/course';
import { UserData } from '../../types/user';
import { cn } from '../../utils/cn';
import EnrollModal from '../modal/EnrollModal';

export default function CourseDetailCard({ courseDetail }: { courseDetail: Course | undefined }) {
    return (
        <div
            className={cn(
                'absolute right-[-50px] bottom-[-350px]',
                'bg-info rounded-xl',
                'overflow-hidden max-w-sm'
            )}
        >
            {courseDetail && (
                <>
                    <figure>
                        <img src={courseDetail?.thumbnail || ''} alt="Shoes" />
                    </figure>

                    <div className={cn('text-base-100 p-6')}>
                        <div className=" font-extrabold text-2xl">{`$${
                            courseDetail?.price ?? ''
                        } CAD`}</div>

                        <div className="my-2">
                            <CardInfo
                                title={'Instructor'}
                                value={`${(courseDetail?.adminId as UserData)?.firstName} ${
                                    (courseDetail?.adminId as UserData)?.lastName
                                }`}
                            />

                            <CardInfo title={'Videos'} value={`${courseDetail?.content.length ?? 0}`} />
                            <CardInfo title={'Students'} value={`${0}`} />
                            <CardInfo title={'Language'} value={`English`} />
                        </div>

                        <div className={cn('mt-4')}>
                            <a
                                onClick={() =>
                                    (document.getElementById('my_modal_8') as HTMLDialogElement).showModal()
                                }
                                className={cn('btn-primary btn w-full')}
                            >
                                Enroll
                            </a>
                        </div>
                    </div>
                </>
            )}
            <EnrollModal courseDetail={courseDetail} />
        </div>
    );
}

function CardInfo({ title, value }: { title: string; value: string }) {
    return (
        <div className={cn('flex justify-between')}>
            <div className="">{title ?? ''}</div>
            <div className="font-bold">{value ?? ''}</div>
        </div>
    );
}
