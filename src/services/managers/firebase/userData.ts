import { AddictionManager } from './addiction';
import { RelapseManager } from './relapse';

import { Addiction, Relapse } from '@/structures';

export enum UserDataUpdateTypes {
  ADDICTION = 'addiction',
  RELAPSE = 'relapse',
}

class UserDataManager {
  private userId: string;
  public addictions: AddictionManager;
  public relapses: RelapseManager;

  constructor(userId: string) {
    this.userId = userId;
    this.addictions = new AddictionManager(userId);
    this.relapses = new RelapseManager(userId);
  }

  initializeDataListeners(
    updateCallback: (data: Addiction[], type: UserDataUpdateTypes) => void,
  ): void {
    // FIREBASE THINGS...
    this.addictions.listenToChanges(() => {
      this.combineDataAndUpdate(updateCallback, UserDataUpdateTypes.ADDICTION);
    });

    this.relapses.listenToChanges(() => {
      this.combineDataAndUpdate(updateCallback, UserDataUpdateTypes.RELAPSE);
    });
  }

  private async combineDataAndUpdate(
    callback: (data: Addiction[], type: UserDataUpdateTypes) => void,
    type: UserDataUpdateTypes,
  ): Promise<void> {
    const addictionsData = this.addictions.getAddictionsData();
    const relapsesData = this.relapses.getRelapsesData();

    const combinedAddictions = addictionsData.map(addiction => {
      const relapses = [...relapsesData].filter(
        relapse => relapse.addictionId === addiction.id,
      );

      return new Addiction({
        ...addiction,
        relapses: relapses.map(relapse => new Relapse(relapse)),
      });
    });

    callback(combinedAddictions, type);
  }

  unsubscribeFromChanges(): void {
    this.addictions.unsubscribe();
    this.relapses.unsubscribe();
  }
}

export { UserDataManager };
