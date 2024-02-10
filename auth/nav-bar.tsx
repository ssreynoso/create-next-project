'use client'

// import Image from 'next/image'
// import Logo from '@/assets/logo.png'
// import { ChangeTheme } from '@/components/change-theme'
import { ModeToggle } from '@/components/dark-mode-toggle-button'
import { AuthButton } from './auth/auth-button'
import { MainNav } from '@/components/navigation/main-nav'
import { NavBarDynamicBackground } from '@/components/navigation/nav-bar-dynamic-background'

export const NavBar = () => {
    return (
        <NavBarDynamicBackground>
            <div className="container h-full flex justify-center items-center relative">
                {/* <Image src={Logo} alt='Logo' className='h-2/3 max-h-10 w-max absolute left-0' /> */}
                <MainNav />
                <div className='absolute right-0 hidden xl:inline-flex gap-2'>
                    <AuthButton />
                    <ModeToggle />
                </div>
                {/* <ChangeTheme /> */}
            </div>
        </NavBarDynamicBackground>
    )
}