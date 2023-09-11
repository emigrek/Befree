import * as ExpoSecureStore from 'expo-secure-store';

// This prevent expo-secure-store warn
// "Provided value to SecureStore is larger than 2048 bytes. An attempt to store such a value will throw an error in SDK 35."
function getValue(value: string) {
  const parsedValue = JSON.parse(value);

  if (parsedValue) {
    delete parsedValue.providerData;
  }

  return JSON.stringify(parsedValue);
}

// This prevent firebase/auth invalid keys error by replacing all wrong characters with '_'
function replacer(key: string) {
  return key.replace(/[^a-z0-9.\-_]/gi, '_');
}

const SecureAuthStore = {
  getItem: async (key: string) => {
    return ExpoSecureStore.getItemAsync(replacer(key));
  },
  setItem: async (key: string, value: string) => {
    return ExpoSecureStore.setItemAsync(replacer(key), getValue(value));
  },
  removeItem: async (key: string) => {
    return ExpoSecureStore.deleteItemAsync(replacer(key));
  },
};

export { SecureAuthStore };
