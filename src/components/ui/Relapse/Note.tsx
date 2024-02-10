import React, { FC } from 'react';
import { Text, TextProps } from 'react-native-paper';

import i18n from '@/i18n';
import { useTheme } from '@/theme';

interface NoteProps extends Omit<TextProps<'string'>, 'variant' | 'children'> {
  note: string;
}

const Note: FC<NoteProps> = ({ note, style, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[style, { color: colors.outline }]}
      variant={'bodyMedium'}
      {...props}
    >
      {note.length ? note : i18n.t(['labels', 'emptyNote'])}
    </Text>
  );
};

export { Note };
