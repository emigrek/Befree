import { useBottomSheet } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Image } from '../Addiction';

import { ImageUploading } from '@/components/screens/CreationWizard';
import i18n from '@/i18n';
import { editAddiction } from '@/services/queries';
import { deleteImage, useImageUpload } from '@/services/storage';
import { useAuthStore } from '@/store';

interface EditViewProps {
  addiction: Addiction;
}

const EditView: FC<EditViewProps> = ({ addiction }) => {
  const { close } = useBottomSheet();
  const user = useAuthStore(state => state.user);
  const { upload, imageUploadProgress, imageUploadStatus } = useImageUpload();

  const [name, setName] = useState<string>(addiction.name);
  const [image, setImage] = useState<string | null>(addiction.image);

  const handleImageChange = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;

    setImage(result.assets[0].uri);
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleSave = useCallback(async () => {
    if (!user) return;

    const imageChanged = image !== addiction.image;
    const nameChanged = name !== addiction.name;

    if (!imageChanged && !nameChanged) {
      return close();
    }

    const newImage =
      imageChanged && image
        ? await upload(`users/${user.uid}/addictions/${addiction.id}`, image)
        : null;

    if (!newImage) {
      await deleteImage({
        path: `users/${user.uid}/addictions/${addiction.id}`,
      });
    }

    const newAddiction = {
      name,
      image: newImage,
    };

    editAddiction({
      user,
      id: addiction.id,
      addiction: newAddiction,
    }).then(() => {
      close();
    });
  }, [user, addiction, name, image, upload, close]);

  if (imageUploadStatus) {
    return <ImageUploading progress={imageUploadProgress} />;
  }

  return (
    <View style={style.container}>
      <View style={style.innerContainer}>
        <Image name={addiction.name} image={image} size={250} />
        <View style={style.buttonContainer}>
          <Button onPress={handleImageChange}>
            {i18n.t(['bottomSheets', 'edit', 'changeImage'])}
          </Button>
          {image && (
            <Button onPress={() => setImage(null)}>
              {i18n.t(['bottomSheets', 'edit', 'removeImage'])}
            </Button>
          )}
        </View>
        <TextInput
          label={i18n.t(['labels', 'name'])}
          value={name}
          onChangeText={handleNameChange}
        />
      </View>
      <Button
        mode={'contained'}
        contentStyle={{ height: 48 }}
        onPress={handleSave}
      >
        {i18n.t(['labels', 'save'])}
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 60,
  },
  innerContainer: {
    gap: 15,
  },
  buttonContainer: {
    gap: 5,
  },
});

export { EditView };
