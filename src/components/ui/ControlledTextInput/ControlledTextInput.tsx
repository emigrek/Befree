import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { View } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';

export function ControlledTextInput<T extends FieldValues>({
  control,
  name,
  rules,
  ...textInputProps
}: UseControllerProps<T> & TextInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error, invalid },
      }) => (
        <View style={{ width: '100%' }}>
          <TextInput
            {...textInputProps}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={invalid}
          />
          {invalid && (
            <HelperText type="error" visible={invalid}>
              {error?.message}
            </HelperText>
          )}
        </View>
      )}
    />
  );
}
