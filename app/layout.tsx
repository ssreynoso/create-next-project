import '@/styles/globals.css'
import '@/styles/variables.css'
import '@/styles/animations.css'
import '@/styles/scroll-bar.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { NavBar } from '@/components/nav-bar'
import { Providers } from '@/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Title',
    description: 'Description',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <NavBar />
                    <div className='mt-nav-bar-height'>
                        {children}
                    </div>
                    <Toaster />
                </Providers>
            </body>
        </html>
    )
}
