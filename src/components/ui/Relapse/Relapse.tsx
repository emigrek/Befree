import { Card, CardProps } from 'react-native-paper';

import { ChipsList } from './ChipsList';
import { Content } from './Content';
import { Note } from './Note';
import { Title } from './Title';

interface RelapseProps extends Omit<CardProps, 'elevation'> {}

function Relapse({ ...props }: RelapseProps) {
  return <Card {...props} />;
}

Relapse.Content = Content;
Relapse.ChipsList = ChipsList;
Relapse.Note = Note;
Relapse.Title = Title;

export { Relapse };
