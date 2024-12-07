import NavBar from '../../components/layout/NavBar';

import { cn } from '../../utils/cn';
import { useLocation } from 'react-router-dom';

// Pages
import AddCourse from './AddCourse';
import CourseList from './CourseList';
import Dashboard from './Dashboard';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
    const location = useLocation();
    const [currentTab, setCurrentTab] = useState<string>('/add-course');

    useEffect(() => {
        const path = location.pathname;
        console.log('path: ', path);
    }, [location.pathname]);

    const renderDashboard = () => {
        switch (currentTab) {
            case '':
                return <Dashboard />;
            case '/add-course':
                return <AddCourse />;
            case '/list':
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
                            <div onClick={() => setCurrentTab('')}>Dashboard</div>
                        </li>
                        <li>
                            <div onClick={() => setCurrentTab('/add-course')}>Add a course</div>
                        </li>
                        <li>
                            <div onClick={() => setCurrentTab('/list')}>Course list</div>
                        </li>
                    </ul>
                </div>

                <div className="drawer-content">{renderDashboard()}</div>
            </div>
        </div>
    );
}
