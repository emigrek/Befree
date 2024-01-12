import * as ImagePicker from 'expo-image-picker';
import { createContext, useContext, useState } from 'react';

interface ImagePickerContextProps {
  image: string | null;
  setImage: (image: string | null) => void;
  options: ImagePicker.ImagePickerOptions;
  setOptions: (options: ImagePicker.ImagePickerOptions) => void;
  onImageChange?: (image: string | null) => void;
}

const defaultImagePickerOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.6,
};

const ImagePickerContext = createContext<ImagePickerContextProps>({
  image: null,
  setImage: () => {},
  options: defaultImagePickerOptions,
  setOptions: () => {},
  onImageChange: () => {},
});

interface ImagePickerProviderProps {
  children: React.ReactNode;
  image: string | null;
  options?: ImagePicker.ImagePickerOptions;
  onImageChange?: (image: string | null) => void;
}

export function ImagePickerProvider(props: ImagePickerProviderProps) {
  const [image, setImage] = useState<string | null>(props.image || null);
  const [options, setOptions] = useState<ImagePicker.ImagePickerOptions>(
    props.options || defaultImagePickerOptions,
  );

  return (
    <ImagePickerContext.Provider
      value={{
        image,
        setImage,
        options,
        setOptions,
        onImageChange: props.onImageChange,
      }}
    >
      {props.children}
    </ImagePickerContext.Provider>
  );
}

export const useImagePickerContext = () => {
  const context = useContext(ImagePickerContext);

  if (context === undefined) {
    throw new Error(
      'useImagePickerContext must be used within a ImagePickerProvider',
    );
  }

  return context;
};
