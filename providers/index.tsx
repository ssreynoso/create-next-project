'use client'

import { PropsWithChildren } from 'react'
import { ThemeProvider } from '@/providers/theme-provider'
import { AppContextProvider } from '@/providers/app-context-provider'
import { Toaster } from '@/components/ui/toaster'
import { ModalProvider } from './modal-provider'

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AppContextProvider>
                {children}
                <Toaster />
                <ModalProvider />
            </AppContextProvider>
        </ThemeProvider>
    )
}
