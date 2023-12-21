import notifee, { EventType, Notification } from '@notifee/react-native';

import { showAchievement } from './pressHandlers/showAchievement';

class Notifications {
  constructor() {
    this.init();
    this.registerAndroidChannels();
    this.registerEventsListeners();
  }

  public async init() {
    const initial = await notifee.getInitialNotification();
    if (!initial) return;
    this.handlePress(initial.notification);
  }

  public async registerEventsListeners() {
    notifee.onForegroundEvent(async ({ type, detail }) => {
      const { notification } = detail;
      if (!notification) return;

      switch (type) {
        case EventType.PRESS:
          this.handlePress(notification);
          break;
      }
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification } = detail;
      if (!notification) return;

      switch (type) {
        case EventType.PRESS:
          this.handlePress(notification);
          break;
      }
    });
  }

  public async registerAndroidChannels() {
    const defaultChannel = {
      id: 'default',
      name: 'Default',
      description: 'Default notification channel',
    };

    const channels = await notifee.getChannels();
    if (!channels.length) {
      await notifee.createChannel(defaultChannel);
    }
  }

  public async handlePress(notification: Notification) {
    showAchievement(notification);
  }
}

const notifications = new Notifications();

export { notifications };
