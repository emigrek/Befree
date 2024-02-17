import notifee, {
  EventType,
  Notification,
  Trigger,
} from '@notifee/react-native';
import { NativeEventEmitter } from 'react-native';

import { showAchievement } from './notificationPressHandlers/showAchievement';

class NotificationsManager extends NativeEventEmitter {
  private static instance: NotificationsManager;

  private constructor() {
    super();
    this.init();
    this.registerAndroidChannels();
    this.registerEventsListeners();
  }

  public static getInstance(): NotificationsManager {
    if (!NotificationsManager.instance) {
      NotificationsManager.instance = new NotificationsManager();
    }
    return NotificationsManager.instance;
  }

  private async init() {
    const initial = await notifee.getInitialNotification();
    if (!initial) return;
    this.handlePress(initial.notification);
  }

  public scheduleTrigger = async (
    notification: Notification,
    trigger: Trigger,
  ) => {
    const id = await notifee.createTriggerNotification(notification, trigger);
    const newNotification = { id, ...notification };
    this.emit('create', {
      notification: newNotification,
      trigger,
    });
  };

  public display = async (notification: Notification) => {
    notifee.displayNotification(notification);
    this.emit('display', notification);
  };

  public getAllTrigger = async () => {
    return notifee.getTriggerNotifications();
  };

  public cancelTrigger = async (notificationId: string) => {
    notifee.cancelNotification(notificationId);
    this.emit('cancel', notificationId);
  };

  public cancelAllTrigger = async () => {
    const triggerNotifications = await notifee.getTriggerNotifications();

    return Promise.all(
      triggerNotifications.map(({ notification }) => {
        if (!notification.id) return;
        return this.cancelTrigger(notification.id);
      }),
    );
  };

  private async registerEventsListeners() {
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

  private async registerAndroidChannels() {
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

  private async handlePress(notification: Notification) {
    showAchievement(notification);
  }
}

export { NotificationsManager };
