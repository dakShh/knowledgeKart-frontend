/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#4338ca',
                    secondary: '#44403c',
                    accent: '#f5f5f4',
                    neutral: '#facc15',
                    'base-100': '#1c1917',
                    info: '#f3f4f6',
                    success: '#4ade80',
                    warning: '#fef08a',
                    error: '#f43f5e',
                },
            },
        ],
        styled: true,
        base: true,
    },
    plugins: [require('daisyui')],
};
