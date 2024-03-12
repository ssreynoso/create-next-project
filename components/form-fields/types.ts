import { Control, FieldValues as TFieldValues, Path } from 'react-hook-form'

export type FieldValues = TFieldValues

export type FormFieldProps<T extends FieldValues> = {
    control: Control<T>
    name: Path<T>
    label: string
    placeholder: string
}