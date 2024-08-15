import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import '@/styles/index.css'
import '@/styles/animations.css'
import '@/styles/scroll-bar.css'
import '@/styles/variables.css'
import { Providers } from '@/providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Providers>
            <App />
        </Providers>
    </React.StrictMode>
)
