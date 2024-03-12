import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type FieldValues, FormFieldProps } from './types'
import { genresArray } from '@/lib/genre'

type Props<T extends FieldValues> = Pick<FormFieldProps<T>, 'control' | 'name' | 'label'>

export const GenreFormField = <T extends FieldValues>({ control, name, label }: Props<T>) => {
    return (
        <FormField
            control = { control }
            name    = { name }
            render  = {({ field }) => (
                <FormItem>
                    <FormLabel>{ label }</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="bg-secondary w-full">
                                <SelectValue placeholder='Select a genre'/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectGroup>
                                {genresArray.map((genre) => (
                                    <SelectItem value={genre} key={genre}>
                                        {genre.charAt(0).toUpperCase() + genre.slice(1)}
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
