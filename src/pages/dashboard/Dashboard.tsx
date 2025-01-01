import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { cn } from '../../utils/cn';
import { UserRound } from 'lucide-react';
import { GetDashboardDataApi } from '../../services/DashboardService';
import Loader from '../../components/loader';
export default function Dashboard() {
    const { user, token } = useAuth();

    const [dashboardData, setDashboardData] = useState({
        noOfCourses: 0,
        noOfEnrollments: 0,
    });

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getDashboardData() {
            setLoading(true);
            const response = await GetDashboardDataApi(token ?? '');
            if (response.data) {
                setDashboardData(response.data);
            }
            setTimeout(() => {
                setLoading(false);
            }, 700);
        }

        getDashboardData();
    }, []);

    return (
        <div className={cn('container mx-auto', 'px-10 my-8')}>
            <div className={cn('w-full text-3xl font-extrabold mb-10')}>Hey, {user?.firstName}</div>

            {loading ? (
                <div className={cn('w-full h-[200px] grid place-items-center')}>
                    <Loader />
                </div>
            ) : (
                <div className="grid grid-cols-12 gap-5">
                    <div className={cn('bg-primary px-6 pt-10 pb-6 col-span-3', 'rounded-3xl')}>
                        <div>
                            <UserRound />
                        </div>
                        <div className="text-7xl font-extrabold">{dashboardData.noOfEnrollments}</div>
                        <div className="opacity-50 text-sm">Enrollments</div>
                    </div>

                    <div className={cn('bg-primary px-6 pt-10 pb-6 col-span-3', 'rounded-3xl')}>
                        <div>
                            <UserRound />
                        </div>
                        <div className="text-7xl font-extrabold">{dashboardData?.noOfCourses}</div>
                        <div className="opacity-50 text-sm">No. of Courses</div>
                    </div>
                </div>
            )}
        </div>
    );
}
