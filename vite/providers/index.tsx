import { PropsWithChildren } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { ModalProvider } from './modal-provider'

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <>
            {children}
            <Toaster />
            <ModalProvider />
        </>
    )
}
