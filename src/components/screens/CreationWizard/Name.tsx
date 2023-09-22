// import { FC } from 'react';

// import { CreationStack } from '@/navigation';
// import { AddScreenProps } from '@/navigation/types';

// const Add: FC<AddScreenProps> = ({ navigation }) => {
// const { colors } = useTheme();
// const [image, setImage] = useState<string | null>();

// const handleSelect = async () => {
//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsEditing: true,
//     aspect: [1, 1],
//     quality: 1,
//   });

//   if (result.canceled) return;

//   setImage(result.assets[0].uri);
// };

//   return (
// <Screen style={style.screen}>
//   <KeyboardAvoidingView style={style.form}>
//     <TouchableRipple
//       onPress={handleSelect}
//       style={[style.imageContainer, { backgroundColor: colors.border }]}
//     >
//       <>{image && <Image source={{ uri: image }} style={style.image} />}</>
//     </TouchableRipple>
//     <TextInput style={style.input} mode={'flat'} placeholder="name" />
//   </KeyboardAvoidingView>
//   <View style={style.buttons}>
//     <Button mode="contained">Next</Button>
//   </View>
// </Screen>
//   );
// };

// export { Add };

import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import style from './style';

import { Screen } from '@/components/ui/Screen';
import { Subtitle } from '@/components/ui/Text';
import { TextInput } from '@/components/ui/TextInput';
import i18n from '@/i18n';
import { CreationWizardNameScreenProps } from '@/navigation/types';
import { useCreationWizardStore } from '@/store';

const Name: FC<CreationWizardNameScreenProps> = ({ navigation }) => {
  const { name, setName } = useCreationWizardStore(state => ({
    name: state.name,
    setName: state.setName,
  }));

  const next = () => {
    navigation.navigate('StartDate');
  };

  return (
    <Screen style={style.screen}>
      <View style={style.container}>
        <View style={style.texts}>
          <Text variant="headlineMedium">
            {i18n.t(['screens', 'creationWizard', 'name', 'title'])}
          </Text>
          <Subtitle variant="bodyMedium">
            {i18n.t(['screens', 'creationWizard', 'name', 'description'])}
          </Subtitle>
        </View>
        <TextInput
          value={name}
          onChangeText={setName}
          style={style.input}
          placeholder={i18n.t([
            'screens',
            'creationWizard',
            'name',
            'placeholder',
          ])}
        />
      </View>
      <View style={style.floating}>
        <View />
        <Button disabled={!name} mode="contained" onPress={next}>
          {i18n.t(['labels', 'next'])}
        </Button>
      </View>
    </Screen>
  );
};

export { Name };
