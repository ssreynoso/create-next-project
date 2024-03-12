import { useProviders } from '@/hooks/use-providers'
import React from 'react'
import { ProviderButton } from './provider-button'
import { Skeleton } from '../ui/skeleton'

export const ProvidersList = () => {
    const providers = useProviders()

    return (
        <div className='flex flex-col gap-4'>
            { providers ? (
                providers.map((provider) => (
                    <ProviderButton
                        key        = { provider.id }
                        provider   = { provider }
                        buttonText = { `Sign up with ${provider.name}` }
                    />
                ))
            ) : (
                <>
                    <Skeleton className='w-full h-10' />
                </>
            )}
        </div>
    )
}
