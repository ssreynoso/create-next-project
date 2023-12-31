import { NavBar } from '@/components/nav-bar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            <div className='mt-nav-bar-height'>
                {children}
            </div>
        </>
    )
}
