import { z } from 'zod';

import i18n from '@/i18n';

export const NameSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: i18n.t(['validation', 'name', 'min'], { min: 2 }),
    })
    .max(16, {
      message: i18n.t(['validation', 'name', 'max'], { max: 16 }),
    }),
});

export type Name = z.infer<typeof NameSchema>;
