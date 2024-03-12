'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { SignInForm } from './form'
import { ProvidersList } from '@/components/auth/providers-list'

export const LoginPage = () => {
    const [ loading, setLoading ] = useState(false)

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <Card className="w-[200px] md:w-[500px] min-w-fit max-h-[700px] bg-background shadow-lg rounded-xl">
                <CardHeader className='flex items-center'>
                    <CardTitle className='text-xl w-full'>Sign in</CardTitle>
                </CardHeader>
                <CardContent className='relative flex flex-col gap-4'>
                    <SignInForm loading={loading} setLoading={setLoading} />
                    <div className='flex items-center justify-center gap-2 w-full relative h-2'>
                        <Separator className='w-1/2'/>
                        <span className='text-secondary'>O</span>
                        <Separator className='w-1/2'/>
                    </div>
                    <div>
                        <ProvidersList />
                        <div className='flex gap-2 items-center'>
                            <span className='text-sm text-muted-foreground'>No account?</span>
                            <Button variant='link' className='p-0 text-sm text-blue-500'>
                                <Link href='/sign-up'>Sign up</Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage