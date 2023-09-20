import * as ImagePicker from 'expo-image-picker';
import { FC, useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { TextInput, TouchableRipple } from 'react-native-paper';

import { AddScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';

const Add: FC<AddScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [image, setImage] = useState<string | null>();

  const handleSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;

    setImage(result.assets[0].uri);
  };

  return (
    <KeyboardAvoidingView style={style.screen}>
      <TouchableRipple
        onPress={handleSelect}
        style={[style.imageContainer, { backgroundColor: colors.border }]}
      >
        <>{image && <Image source={{ uri: image }} style={style.image} />}</>
      </TouchableRipple>
      <TextInput style={style.input} mode={'flat'} placeholder="name" />
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    gap: 30,
    alignItems: 'center',
    paddingHorizontal: 50,
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 5,
  },
  image: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  input: {
    width: '100%',
  },
});

export { Add };
