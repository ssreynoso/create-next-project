import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
                hover: 'var(--hover)',
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)',
                    form: 'rgb(239, 68, 68)'
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)',
                },
                popover: {
                    DEFAULT: 'var(--popover)',
                    foreground: 'var(--popover-foreground)',
                },
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)',
                },
                warning: {
                    DEFAULT: 'var(--warning)',
                    foreground: 'var(--warning-foreground)',
                },
            },
            spacing: {
                'screen-nav-bar': 'calc(100vh - var(--nav-bar-height))',
                'nav-bar-height': 'var(--nav-bar-height)',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            gridTemplateColumns: {
                // Simple 16 column grid
                '16': 'repeat(16, minmax(0, 1fr))',
                // Complex site-specific column configuration
                'footer': '200px minmax(900px, 1fr) 100px',
            },
            fontSize: {
                sm: 'clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)',
                base: 'clamp(1rem, 0.34vw + 0.91rem, 1.19rem)',
                lg: 'clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)',
                xl: 'clamp(1.56rem, 1vw + 1.31rem, 2.11rem)',
                '2xl': 'clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)',
                '3xl': 'clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem)',
                '4xl': 'clamp(3.05rem, 3.54vw + 2.17rem, 5rem)',
                '5xl': 'clamp(3.81rem, 5.18vw + 2.52rem, 6.66rem)',
                '6xl': 'clamp(4.77rem, 7.48vw + 2.9rem, 8.88rem)',
            }
        },
    },
    plugins: [require('tailwindcss-animate')],
}
export default config
