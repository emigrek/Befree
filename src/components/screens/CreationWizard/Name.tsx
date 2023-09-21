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
import { Button, Text, TextInput } from 'react-native-paper';

import style from './style';

import { Screen } from '@/components/ui/Screen';
import { Subtitle } from '@/components/ui/Text';
import { CreationWizardNameScreenProps } from '@/navigation/types';

const Name: FC<CreationWizardNameScreenProps> = ({ navigation }) => {
  const next = () => {
    navigation.navigate('StartDate');
  };

  return (
    <Screen style={style.screen}>
      <View style={style.texts}>
        <Text variant="displaySmall">Name</Text>
        <Subtitle variant="bodyMedium">
          Name bad habit that you want to get rid of
        </Subtitle>
      </View>
      <TextInput style={style.input} placeholder="Addiction name" />
      <View style={style.floating}>
        <View />
        <Button mode="contained" onPress={next}>
          Next
        </Button>
      </View>
    </Screen>
  );
};

export { Name };
