import { z } from 'zod';

import i18n from '@/i18n';

export const NameSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: i18n.t(['validation', 'name', 'min']),
    })
    .max(16, {
      message: i18n.t(['validation', 'name', 'max']),
    }),
});

export type Name = z.infer<typeof NameSchema>;
