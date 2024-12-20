import {
    UseFormRegister,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    FieldArrayWithId,
} from 'react-hook-form';
import { cn } from '../../utils/cn';
import { CreateCourseSchemaType } from '../../schemas/courseSchema';

interface AddCourseContentProps {
    register: UseFormRegister<CreateCourseSchemaType>;
    error: string | null;
    fields: FieldArrayWithId<CreateCourseSchemaType, 'content', 'id'>[];
    append: UseFieldArrayAppend<CreateCourseSchemaType>;
    remove: UseFieldArrayRemove;
}

export default function AddCourseContent(props: AddCourseContentProps) {
    return (
        <div className="">
            <div className={cn('font-bold text-2xl mt-6 mb-3')}>Content</div>
            <div className={cn('flex flex-col')}>
                {props.fields?.map((c, index) => {
                    return (
                        <div
                            key={index}
                            className="flex bg-white/10 p-5 rounded-xl relative flex-col gap-y-4 pb-6 mb-4 border-dashed border-b border-white/60"
                        >
                            <div className={cn('w-full relative')}>
                                <input
                                    className={cn(
                                        'w-full input input-sm input-bordered focus:outline-none'
                                    )}
                                    placeholder="Title"
                                    {...props.register(`content.${index}.title`)}
                                />
                            </div>

                            <textarea
                                className="textarea textarea-bordered focus:outline-none"
                                placeholder="Description"
                                {...props.register(`content.${index}.description`)}
                            ></textarea>

                            <div>
                                <div>Video</div>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered file-input-secondary file-input-sm  focus:outline-none w-full max-w-xs"
                                    // TODO: Work on -> logic: deleting any content does not correctly set
                                    // the video input (shows previous input file)
                                    {...props.register(`content.${index}.video`)}
                                />
                            </div>
                        </div>
                    );
                })}

                {props.fields.length <= 2 && (
                    <button
                        type="button"
                        onClick={() => {
                            props.append({ title: '', description: '', video: null });
                        }}
                        className="btn btn-secondary btn-sm mt-4"
                    >
                        Add Content
                    </button>
                )}
            </div>
        </div>
    );
}
