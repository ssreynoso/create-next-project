import { z } from 'zod'

export const genresArray = ['male', 'female', 'other'] as const
export const genres = z.enum(genresArray)
export type Genre = z.infer<typeof genres>