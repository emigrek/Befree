import { z } from 'zod';

import i18n from '@/i18n';

export const NameAndImageSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: i18n.t(['validation', 'nameAndImage', 'name', 'min']),
    })
    .max(32, {
      message: i18n.t(['validation', 'nameAndImage', 'name', 'max']),
    }),
  image: z.string().url().nullable(),
});

export type NameAndImage = z.infer<typeof NameAndImageSchema>;
