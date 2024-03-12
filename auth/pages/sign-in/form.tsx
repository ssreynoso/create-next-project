import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { InputFormField } from '@/components/form-fields/input'
import { PasswordFormField } from '@/components/form-fields/password'
import { SignInForm as TSignInForm, signInFormSchema } from '@/schemas/auth'

type Props = {
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignInForm = ({ loading, setLoading }: Props) => {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<TSignInForm>({
        // Se necesita tener 'zod': '3.21.4' y @hookform/resolvers en 3.3.0 porque da error de tipos
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    })

    const onSubmit = async (values: TSignInForm) => {
        setLoading(true)

        try {
            const signInResponse = await signIn('login', {
                email: values.email,
                password: values.password,
                redirect: false,
            })

            if (signInResponse?.error) {
                toast({
                    title: signInResponse.error as string,
                    variant: 'destructive',
                })
                
                form.setError('email', { type: 'server', message: '' }, { shouldFocus: true })
                form.setError('password', { type: 'server', message: '' })
            }

            if (signInResponse?.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
            toast({
                title: 'Error',
                description: 'Algo salió mal al iniciar sesión',
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
                className='flex flex-col gap-4'
            >
                <InputFormField control={form.control} name='email' label='E-mail' placeholder='example@mail.com' />
                <PasswordFormField control={form.control} name='password' label='Password' placeholder='*********' />
                <Button type='submit' disabled={loading}>
                    Login
                </Button>
            </form>
        </Form>
    )
}