import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeEventEmitter } from 'react-native';

class NotificationsBlacklistManager extends NativeEventEmitter {
  private static instance: NotificationsBlacklistManager;

  private constructor() {
    super();
  }

  public static getInstance(): NotificationsBlacklistManager {
    if (!NotificationsBlacklistManager.instance) {
      NotificationsBlacklistManager.instance =
        new NotificationsBlacklistManager();
    }
    return NotificationsBlacklistManager.instance;
  }

  async add(addictionId: string) {
    try {
      const blacklist = await this.get();
      blacklist.push(addictionId);

      await AsyncStorage.setItem(
        `notificationsBlacklist`,
        JSON.stringify(blacklist),
      );

      this.emit('add', addictionId);
    } catch (error) {
      console.error('Error adding addiction to blacklist: ', error);
    }
  }

  async remove(addictionId: string) {
    try {
      const blacklist = await this.get();
      const newBlacklist = blacklist.filter(id => id !== addictionId);

      await AsyncStorage.setItem(
        `notificationsBlacklist`,
        JSON.stringify(newBlacklist),
      );

      this.emit('remove', addictionId);
    } catch (error) {
      console.error('Error removing addiction from blacklist: ', error);
    }
  }

  async get(): Promise<string[]> {
    try {
      const blacklist = await AsyncStorage.getItem(`notificationsBlacklist`);

      return blacklist ? JSON.parse(blacklist) : [];
    } catch (error) {
      console.error('Error getting blacklist: ', error);
      return [];
    }
  }

  async has(addictionId: string): Promise<boolean> {
    const blacklist = await this.get();
    return blacklist.includes(addictionId);
  }

  async clear() {
    await AsyncStorage.removeItem(`notificationsBlacklist`);

    this.emit('clear');
  }
}

export { NotificationsBlacklistManager };
