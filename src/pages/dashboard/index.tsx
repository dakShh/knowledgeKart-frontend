import NavBar from '../../components/layout/NavBar';

import { cn } from '../../utils/cn';
import { useNavigate } from 'react-router-dom';

// Pages
import AddCourse from './AddCourse';
import CourseList from './CourseList';
import Dashboard from './Dashboard';
import { useParams } from 'react-router-dom';
export default function DashboardPage() {
    const { path } = useParams();
    const navigate = useNavigate();

    const renderDashboard = () => {
        switch (path) {
            case 'home':
                return <Dashboard />;
            case 'add-course':
                return <AddCourse />;
            case 'list':
                return <CourseList />;
            default:
                return <div>Loading..</div>;
        }
    };

    return (
        <div className={cn('container mx-auto')}>
            <NavBar />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <li>
                            <div onClick={() => navigate('/dashboard/home')}>Dashboard</div>
                        </li>
                        <li>
                            <div onClick={() => navigate('/dashboard/add-course')}>Add a course</div>
                        </li>
                        <li>
                            <div onClick={() => navigate('/dashboard/list')}>Course list</div>
                        </li>
                    </ul>
                </div>

                <div className="drawer-content">{renderDashboard()}</div>
            </div>
        </div>
    );
}
