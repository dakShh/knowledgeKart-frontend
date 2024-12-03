import NavBar from '../../components/layout/NavBar';
import { cn } from '../../utils/cn';

export default function HomePage() {
    return (
        <div className={cn('container mx-auto')}>
            <NavBar />
            <div>hello mfk</div>
        </div>
    );
}
