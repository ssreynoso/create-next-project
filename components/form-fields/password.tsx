import React, { useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { type FieldValues, FormFieldProps } from './types'

export const PasswordFormField = <T extends FieldValues>({ control, name, label, placeholder }: FormFieldProps<T>) => {
    return (
        <FormField
            control = { control }
            name    = { name }
            render  = {({ field }) => {
                const [showPassword, setShowPassword] = useState(false)

                return (
                    <FormItem>
                        <FormLabel>{ label }</FormLabel>
                        <FormControl>
                            <div className='relative'>
                                <Input
                                    type        = {showPassword ? 'text' : 'password'}
                                    placeholder = { placeholder }
                                    className   = 'bg-secondary'
                                    {...field}
                                />
                                { field.value && (
                                    <Button
                                        size      = 'icon'
                                        variant   = 'ghost'
                                        type      = 'button'
                                        className = 'absolute right-2 top-1/2 transform -translate-y-1/2'
                                        onClick   = {(e) => {
                                            e.preventDefault()
                                            setShowPassword(!showPassword)
                                        }}
                                    >
                                        { showPassword ? <EyeOpenIcon /> : <EyeClosedIcon /> }
                                    </Button>
                                )}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            }
        />
    )
}
