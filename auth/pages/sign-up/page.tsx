'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { SignUpForm } from './form'
import { ProvidersList } from '@/components/auth/providers-list'
// import LoadingAnimation from '@/assets/lottie/login-loading.json'
// import { Lottie } from '@/components/lottie'

export const RegisterPage = () => {
    const [ loading, setLoading ] = useState(false)

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <Card className='w-[200px] md:w-[500px] max-h-[700px] bg-background shadow-lg rounded-xl'>
                <CardHeader className='flex items-center'>
                    <CardTitle className='text-xl w-full'>Sign up</CardTitle>
                </CardHeader>
                <CardContent className='relative flex flex-col gap-4 px-2'>
                    <SignUpForm
                        loading={loading}
                        setLoading={setLoading}
                    />
                    <div className='flex items-center justify-center gap-2 w-full relative h-2 px-4'>
                        <Separator className='w-1/2'/>
                        <span className='text-secondary'>o</span>
                        <Separator className='w-1/2'/>
                    </div>
                    <div className='flex flex-col justify-end px-4'>
                        <ProvidersList />
                        <div className='flex gap-2 items-center'>
                            <span className='text-sm text-muted-foreground'>Have an account?</span>
                            <Button variant='link' className='p-0 text-sm text-blue-500'>
                                <Link href='/sign-in'>Sign in</Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegisterPage