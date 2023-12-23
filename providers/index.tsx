'use client'

import { PropsWithChildren } from 'react'
import { ThemeProvider } from '@/providers/theme-provider'
import { AppContextProvider } from '@/providers/app-context-provider'

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AppContextProvider>
                {children}
            </AppContextProvider>
        </ThemeProvider>
    )
}
