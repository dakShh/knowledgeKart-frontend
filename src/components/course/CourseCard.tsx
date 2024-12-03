import { Course } from '../../types/course';

export default function CourseCard({ courseInfo }: { courseInfo: Course }) {
    return (
        <div className="card bg-[#e7e7e7] text-base-100 shadow-xl">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{courseInfo.title}</h2>
                <p>{courseInfo.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-base-300">Buy Now</button>
                </div>
            </div>
        </div>
    );
}
