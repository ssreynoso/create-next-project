'use client'

// import Image from 'next/image'
// import Logo from '@/assets/logo.png'
import { ModeToggle } from '@/components/dark-mode-toggle-button'
import { MainNav } from '@/components/navigation/main-nav'
import { NavBarDynamicBackground } from '@/components/navigation/nav-bar-dynamic-background'
// import { ChangeTheme } from '@/components/change-theme'

export const NavBar = () => {
    return (
        <NavBarDynamicBackground>
            <div className="container h-full flex justify-center items-center relative">
                {/* <Image src={Logo} alt='Logo' className='h-2/3 max-h-10 w-max absolute left-0' /> */}
                <MainNav />
                <ModeToggle className='absolute right-8 hidden xl:inline-flex'/>
                {/* <ChangeTheme /> */}
            </div>
        </NavBarDynamicBackground>
    )
}