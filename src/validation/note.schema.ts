import { z } from 'zod';

import i18n from '@/i18n';

export const NoteSchema = z.object({
  note: z
    .string()
    .max(1000, {
      message: i18n.t(['validation', 'note', 'max'], { max: 1000 }),
    })
    .optional(),
});

export type Note = z.infer<typeof NoteSchema>;
