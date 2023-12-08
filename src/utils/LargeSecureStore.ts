// ❤ Thanks to Supabase
// https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?auth-store=secure-store#initialize-a-react-native-app
// This prevent expo-secure-store warn
// "Provided value to SecureStore is larger than 2048 bytes. An attempt to store such a value will throw an error in SDK 35."

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as aesjs from 'aes-js';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

class LargeSecureStore {
  private async _encrypt(key: string, value: string) {
    const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));

    const cipher = new aesjs.ModeOfOperation.ctr(
      encryptionKey,
      new aesjs.Counter(1),
    );
    const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));

    await SecureStore.setItemAsync(
      key,
      aesjs.utils.hex.fromBytes(encryptionKey),
    );

    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  private async _decrypt(key: string, value: string) {
    const encryptionKeyHex = await SecureStore.getItemAsync(key);
    if (!encryptionKeyHex) {
      return encryptionKeyHex;
    }

    const cipher = new aesjs.ModeOfOperation.ctr(
      aesjs.utils.hex.toBytes(encryptionKeyHex),
      new aesjs.Counter(1),
    );
    const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));

    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }

  // This prevent firebase/auth invalid keys error by replacing all unsupported characters with '_'
  private _replacer(key: string) {
    return key.replace(/[^a-z0-9.\-_]/gi, '_');
  }

  async getItem(key: string) {
    const encrypted = await AsyncStorage.getItem(this._replacer(key));
    if (!encrypted) {
      return encrypted;
    }

    return await this._decrypt(this._replacer(key), encrypted);
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(this._replacer(key));
    await SecureStore.deleteItemAsync(this._replacer(key));
  }

  async setItem(key: string, value: string) {
    const encrypted = await this._encrypt(this._replacer(key), value);

    await AsyncStorage.setItem(this._replacer(key), encrypted);
  }
}

export { LargeSecureStore };
