import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type FieldValues, FormFieldProps } from './types'

export const InputFormField = <T extends FieldValues>({ control, name, label, placeholder }: FormFieldProps<T>) => {
    return (
        <FormField
            control = { control }
            name    = { name }
            render  = {({ field }) => (
                <FormItem>
                    <FormLabel>{ label }</FormLabel>
                    <FormControl>
                        <Input
                            placeholder = { placeholder }
                            className   = 'bg-secondary'
                            type='text'
                            {...field}
                        />
                    </FormControl>
                    {/* <FormDescription>Esta es una descripción del campo</FormDescription> */}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
