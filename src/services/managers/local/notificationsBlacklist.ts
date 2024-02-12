import AsyncStorage from '@react-native-async-storage/async-storage';

class NotificationsBlacklistManager {
  static async add(addictionId: string) {
    try {
      const blacklist = await this.get();
      blacklist.push(addictionId);
      await AsyncStorage.setItem(
        `notificationsBlacklist`,
        JSON.stringify(blacklist),
      );
    } catch (error) {
      console.error('Error adding addiction to blacklist: ', error);
    }
  }

  static async remove(addictionId: string) {
    try {
      const blacklist = await this.get();
      const newBlacklist = blacklist.filter(id => id !== addictionId);
      await AsyncStorage.setItem(
        `notificationsBlacklist`,
        JSON.stringify(newBlacklist),
      );
    } catch (error) {
      console.error('Error removing addiction from blacklist: ', error);
    }
  }

  static async get(): Promise<string[]> {
    try {
      const blacklist = await AsyncStorage.getItem(`notificationsBlacklist`);

      return blacklist ? JSON.parse(blacklist) : [];
    } catch (error) {
      console.error('Error getting blacklist: ', error);
      return [];
    }
  }

  static async has(addictionId: string): Promise<boolean> {
    const blacklist = await this.get();
    return blacklist.includes(addictionId);
  }

  static async clear() {
    await AsyncStorage.removeItem(`notificationsBlacklist`);
  }
}

export { NotificationsBlacklistManager };
