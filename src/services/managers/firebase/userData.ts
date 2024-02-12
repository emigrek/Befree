import { AddictionManager } from './addiction';
import { RelapseManager } from './relapse';

class UserDataManager {
  private userId: string;
  public addictions: AddictionManager;
  public relapses: RelapseManager;

  constructor(userId: string) {
    this.userId = userId;
    this.addictions = new AddictionManager(userId);
    this.relapses = new RelapseManager(userId);
  }

  initializeDataListeners(updateCallback: (data: any) => void): void {
    // FIREBASE THINGS...
    this.addictions.listenToChanges(() => {
      this.combineDataAndUpdate(updateCallback);
    });

    this.relapses.listenToChanges(() => {
      this.combineDataAndUpdate(updateCallback);
    });
  }

  private async combineDataAndUpdate(
    callback: (data: any) => void,
  ): Promise<void> {
    const addictionsData = this.addictions.getAddictionsData();
    const relapsesData = this.relapses.getRelapsesData();
    const combinedData = addictionsData.map(addiction => ({
      ...addiction,
      relapses: [...relapsesData]
        .filter(relapse => relapse.addictionId === addiction.id)
        .sort((a, b) => a.relapseAt.getTime() - b.relapseAt.getTime()),
    }));

    callback(combinedData);
  }

  unsubscribeFromChanges(): void {
    this.addictions.unsubscribe();
    this.relapses.unsubscribe();
  }
}

export { UserDataManager };
