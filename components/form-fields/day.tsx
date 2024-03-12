import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type FieldValues, FormFieldProps } from './types'

type Props<T extends FieldValues> = Pick<FormFieldProps<T>, 'control' | 'name' | 'label'>

export const DayFormField = <T extends FieldValues>({ control, name, label }: Props<T>) => {
    return (
        <FormField
            control = { control }
            name    = { name }
            render  = {({ field }) => (
                <FormItem>
                    <FormLabel>{ label}</FormLabel>
                    <FormControl>
                        <Input
                            type        = 'text'
                            placeholder = 'DD'
                            className   = 'bg-secondary'
                            maxLength   = {2}
                            {...field}
                            value       ={field.value ? field.value.toString() : ''}
                            onChange    ={(e) => field.onChange(e.target.value === '' ? 0 : parseInt(e.target.value))}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
