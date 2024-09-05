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
        },
    },
    plugins: [],
};
