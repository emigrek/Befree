import * as ExpoSecureStore from 'expo-secure-store';

// This prevent expo-secure-store warn
// "Provided value to SecureStore is larger than 2048 bytes. An attempt to store such a value will throw an error in SDK 35."
// https://stackoverflow.com/a/76569412
function removeUserMetaData(value: string) {
  const parsedValue = JSON.parse(value);

  if (parsedValue) {
    delete parsedValue.state?.user?.apiKey;
    delete parsedValue.state?.user?.providerData;
  }

  return JSON.stringify(parsedValue);
}

const SecureAuthStore = {
  getItem: ExpoSecureStore.getItemAsync,
  setItem: (key: string, value: string) => {
    ExpoSecureStore.setItemAsync(key, removeUserMetaData(value));
  },
  removeItem: ExpoSecureStore.deleteItemAsync,
};

export { SecureAuthStore };
