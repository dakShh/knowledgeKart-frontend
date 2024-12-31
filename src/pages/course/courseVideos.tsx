import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// MISC
import { cn } from '../../utils/cn';

// Components
import NavBar from '../../components/layout/NavBar';

// Types
import { Course } from '../../types/course';
import { GetCourseById } from '../../services/CourseService';
import { sleep } from '../../utils/helper';

type CurrentVideo =
    | {
          title: string;
          description: string;
          video: string;
      }
    | null
    | undefined;

export default function CourseVideos() {
    const [course, setCourse] = useState<Course>();
    const { id: courseId } = useParams();
    const [currentVideo, setCurrentVideo] = useState<CurrentVideo>(null);
    const [loading, setIsLoading] = useState<boolean>(false);

    function handleVideoChange(idx: number) {
        setIsLoading(true);
        setTimeout(() => {
            setCurrentVideo(course?.content[idx]);
            setIsLoading(false);
        }, 400);
    }

    useEffect(() => {
        async function getCourseDetail(courseId: string) {
            const response = await GetCourseById(courseId || '');
            if (response) {
                setCourse(response.data);
                setCurrentVideo(response.data.content[0]);
            }
        }

        if (courseId) {
            getCourseDetail(courseId);
        }
    }, []);

    return (
        <div className={cn('container mx-auto')}>
            <NavBar />
            {/* bg-blue-800 min-h-[350px]*/}
            <div className={cn('mt-24 py-8', 'flex items-center')}>
                <div className={cn('max-w-5xl w-full mx-auto ', 'relative', '')}>
                    <div>
                        <div className={cn('text-5xl text-info  font-extrabold mb-2')}>{course?.title}</div>
                        <div className={cn('text-lg text-info font-thin')}>{course?.description}</div>
                    </div>
                </div>
            </div>

            <div className={cn('grid grid-cols-12 mx-auto px-8')}>
                <div className={cn('col-span-8 p-8 h-screen')}>
                    {loading ? (
                        <div className={cn('w-full h-3/4 grid place-items-center')}>
                            <span className="loading loading-bars loading-sm"></span>
                        </div>
                    ) : (
                        <div>
                            {currentVideo && (
                                <video className={cn('mb-5 w-full')} controls={true}>
                                    <source src={currentVideo?.video} type="video/mp4" />
                                </video>
                            )}
                            <div className={cn('bg-accent text-base-100/80 px-6 py-4', 'rounded-md')}>
                                <div className={cn('font-extrabold text-3xl', 'mb-2')}>
                                    {`${currentVideo?.title}`}
                                </div>
                                <div>{currentVideo?.description}</div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={cn('col-span-4 pt-8 ')}>
                    {course?.content?.map((c, index) => {
                        return (
                            <div
                                key={index}
                                className={cn(
                                    'cursor-pointer',
                                    `${
                                        c.title == currentVideo?.title
                                            ? 'bg-[#efefef] text-base-100 font-bold ml-4'
                                            : 'bg-primary'
                                    } `,
                                    'rounded-md',
                                    'px-5 py-2 mb-2',
                                    'flex items-center justify-between'
                                )}
                            >
                                <a
                                    onClick={() => {
                                        handleVideoChange(index);
                                    }}
                                >
                                    {c.title}
                                </a>
                                <div>{index + 1}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
