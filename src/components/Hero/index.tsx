import { cn } from '../../utils/cn';

export default function Hero() {
    return (
        <div className="relative bg-neutral-800">
            <div className="absolute inset-x-0 bottom-0">
                <svg
                    viewBox="0 0 224 12"
                    fill="#1c1917"
                    className="w-full -mb-1 text-white"
                    preserveAspectRatio="none"
                >
                    <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
                </svg>
            </div>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
                    <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                        Unlock Your Potential.
                        <br className="hidden md:block" />
                        Learn, Grow, <span className="text-primary">Succeed</span>.
                    </h2>
                    <p className="mb-6 text-base font-thin tracking-wide text-white/30 md:text-lg">
                        Explore a world of online courses designed to help you master new skills at your own
                        pace. Whether you're looking to advance your career or follow your passion,
                        Knowledge Kart has the resources you need to succeed
                    </p>

                    <p
                        className={cn(
                            'text-xs font-thin tracking-wide text-white sm:text-sm ',
                            'rounded-full bg-primary',
                            'mb-10 sm:mx-auto md:mb-16',
                            'py-2 px-4 max-w-fit'
                        )}
                    >
                        Start Learning Today
                    </p>
                    <button className="flex items-center justify-center w-10 h-10 mx-auto text-white duration-300 transform border border-gray-400 rounded-full hover:text-teal-accent-400 hover:border-teal-accent-400 hover:shadow hover:scale-110">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="currentColor"
                        >
                            <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
