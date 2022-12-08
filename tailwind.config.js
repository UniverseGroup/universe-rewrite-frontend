/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'discord-blurple': '#5865F2',
                'discord-old-blurple': '#7289DA',
                'discord-dark': '#2C2F33',
                'discord-dark-hover': '#383f48',
                'discord-black': '#23272A',
                'discord-pink': '#FF73FA',
                'universe-blue':'#1565c0'
            }
        },
        minHeight: {
            '1': '5rem',
            '2': '14rem',
            '3': '30rem'
        },
        maxHeight: {
            '1': '5rem',
            '2': '14rem',
            '3': '30rem'
        }
    },
    plugins: [],
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
}
