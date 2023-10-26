import { FC } from 'react';
import { Text } from 'react-native-paper';

interface EditViewProps {
  addiction: Addiction;
}

const EditView: FC<EditViewProps> = ({ addiction }) => {
  return (
    <>
      <Text>{addiction.name}</Text>
    </>
  );
};

export { EditView };
