'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SignUpForm as TSignUpForm, signUpFormSchema } from '@/schemas/auth'
import { InputFormField } from '@/components/form-fields/input'
import { PasswordFormField } from '@/components/form-fields/password'
import { DayFormField } from '@/components/form-fields/day'
import { MonthFormField } from '@/components/form-fields/month'
import { YearFormField } from '@/components/form-fields/year'
import { GenreFormField } from '@/components/form-fields/genre'

type Props = {
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignUpForm = ({ loading, setLoading }: Props) => {
    const { toast } = useToast()
    const router    = useRouter()

    const form = useForm<TSignUpForm>({
        // Se necesita tener 'zod': '3.21.4' y @hookform/resolvers en 3.3.0 porque da error de tipos
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            surname: '',
            monthOfBirth: 1,
        },
    })

    const onSubmit = async (values: TSignUpForm) => {
        setLoading(true)

        try {
            const signUpResponse = await signIn('registration', {
                ...values,
                redirect: false,
            })

            if (signUpResponse?.error) {
                toast({
                    title: signUpResponse.error as string,
                    variant: 'destructive',
                })
                
                form.setError('email', { type: 'server', message: '' }, { shouldFocus: true })
                form.setError('password', { type: 'server', message: '' })
            }

            if (signUpResponse?.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
            toast({
                title: 'Error',
                description: 'Algo salió mal al registrarse',
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit(onSubmit)()
                }}
                className='flex flex-col gap-2 max-h-[55vh] overflow-y-auto pretty-scrollbar-y px-4'
            >
                <div className='grid grid-cols-2 gap-4'>
                    <InputFormField control={form.control} name='name' label='Name' placeholder='Juan' />
                    <InputFormField control={form.control} name='surname' label='Surname' placeholder='Cobo' />
                </div>
                <InputFormField control={form.control} name='email' label='E-mail' placeholder='example@mail.com' />
                <PasswordFormField control={form.control} name='password' label='New Password' placeholder='*********' />
                <div className='grid gap-4 grid-cols-3 max-w-full'>
                    <DayFormField control={form.control} name='dayOfBirth' label='Day of birth' />
                    <MonthFormField control={form.control} name='monthOfBirth' label='Month of birth' />
                    <YearFormField control={form.control} name='yearOfBirth' label='Year of birth' />
                </div>
                <GenreFormField control={form.control} name='genre' label='Genre' />
                <Button type='submit' disabled={loading} className='mt-2'>
                    Register
                </Button>
            </form>
        </Form>
    )
}