import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    const PORT = parseInt(env.VITE_PORT)

    if (mode === 'development') {
        return {
            plugins: [react()],
            base: './',
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src/'),
                },
            },
            server: {
                port: PORT,
                open: true,
            },
        }
    }

    return {
        plugins: [react()],
        base: './',
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src/'),
            },
        },
        server: {
            port: 3000,
            open: true,
        },
    }
})
