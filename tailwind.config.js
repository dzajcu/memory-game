/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}"],
    theme: {
        extend: {
            fontSize: {
                "2xs": "10px",
            },
            colors: {
                slate: {
                    300: "#cbd5e1",
                    350: "#a2b1c6",
                    400: "#94a3b8",
                    450: "#7c8ca2",
                    500: "#64748b",
                    600: "#475569",
                    700: "#334155",
                    800: "#1e293b",
                },
            },
            fontFamily: {
                Mukta: "Mukta, sans-serif",
            },
            // Dodajemy animacje i kluczowe ramki
            keyframes: {
                flip: {
                    "0%": { transform: "rotateY(0deg)" },
                    "100%": { transform: "rotateY(180deg)" },
                },
                "flip-back": {
                    "0%": { transform: "rotateY(180deg)" },
                    "100%": { transform: "rotateY(0deg)" },
                },
                "text-flip": {
                    "0%": { transform: "rotateY(0deg)" },
                    "100%": { transform: "rotateY(-180deg)" },
                },
                "text-flip-back": {
                    "0%": { transform: "rotateY(-180deg)" },
                    "100%": { transform: "rotateY(0deg)" },
                },
            },
            animation: {
                "flip-y": "flip 0.6s ease-out forwards",
                "flip-back-y": "flip-back 0.6s ease-out forwards",
                "text-flip-y": "text-flip 0.6s ease-out forwards",
                "text-flip-back-y": "text-flip-back 0.6s ease-out forwards",
            },
        },
    },
    plugins: [],
};
