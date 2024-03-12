import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type FieldValues, FormFieldProps } from './types'
import { useMemo } from 'react'
import { getMonths } from '@/lib/date'

type Props<T extends FieldValues> = Pick<FormFieldProps<T>, 'control' | 'name' | 'label'>

export const MonthFormField = <T extends FieldValues>({ control, name, label }: Props<T>) => {
    const selectMonths = useMemo(() => getMonths(), [])

    return (
        <FormField
            control = { control }
            name    = { name }
            render  = {({ field }) => (
                <FormItem>
                    <FormLabel>{ label }</FormLabel>
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
                        <FormControl>
                            <SelectTrigger className="bg-secondary">
                                <SelectValue />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent side='right'>
                            <SelectGroup>
                                {selectMonths.map((month) => (
                                    <SelectItem value={month.value.toString()} key={month.value}>
                                        {`${month.name.charAt(0).toUpperCase()}${month.name.slice(1)}`}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
