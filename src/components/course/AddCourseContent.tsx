import { UseFormRegister } from 'react-hook-form';
import { cn } from '../../utils/cn';
import { CreateCourseSchemaType } from '../../schemas/courseSchema';

export default function AddCourseContent(props: {
    register: UseFormRegister<CreateCourseSchemaType>;
    error: string | null;
}) {
    const { register, error } = props;

    return (
        <div className={cn('flex flex-col pt-6')}>
            <input type="file" multiple {...register('content')} />
            {error && <span className={cn('text-error text-sm')}>{error || ''}</span>}
        </div>
    );
}
