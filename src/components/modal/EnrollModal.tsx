import { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { EnrollUser } from '../../services/CourseService';
import { Course } from '../../types/course';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';
import { sleep } from '../../utils/helper';

export default function EnrollModal({ courseDetail }: { courseDetail: Course | undefined }) {
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleCheckout() {
        setIsLoading(true);
        await sleep(1000);
        const response = await EnrollUser(courseDetail?._id || '', token as string);
        if (response) {
            toast.success(response.message);
        }
        closeModal();
        setIsLoading(false);
    }

    function closeModal() {
        (document.getElementById('my_modal_8') as HTMLDialogElement).close();
    }

    return (
        <dialog id="my_modal_8" className="modal">
            <div className="modal-box max-w-3xl bg-info text-base-100">
                <h3 className="text-lg font-bold">Ready to enroll?!</h3>
                {isLoading ? (
                    <div className="min-h-[150px] grid place-items-center">
                        <span className="loading loading-bars loading-sm"></span>
                    </div>
                ) : (
                    <>
                        <div className="min-h-[100px] flex gap-x-2 my-10">
                            <img className={cn('h-24', 'rounded-xl')} src={courseDetail?.thumbnail} />
                            <div className="flex flex-col max-w-[300px] w-full">
                                <p className="font-bold">{courseDetail?.title}</p>
                                <div className="break-words opacity-75">{courseDetail?.description}</div>
                            </div>
                            <div className="ml-auto font-bold text-xl">{`$${courseDetail?.price} CAD`}</div>
                        </div>
                        <div className="modal-action">
                            <button onClick={() => handleCheckout()} className="btn btn-primary">
                                Checkout
                            </button>
                            <a onClick={() => closeModal()} className="btn btn-secondary">
                                Close
                            </a>
                        </div>
                    </>
                )}
            </div>
        </dialog>
    );
}
