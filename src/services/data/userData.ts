import AddictionManager from './managers/addiction';
import RelapseManager from './managers/relapse';

class UserData {
  private userId: string;
  public addictions: AddictionManager;
  public relapses: RelapseManager;

  constructor(userId: string) {
    this.userId = userId;
    this.addictions = new AddictionManager(userId);
    this.relapses = new RelapseManager(userId);
  }

  initializeDataListeners(updateCallback: (data: any) => void): void {
    this.addictions.listenToChanges(() => {
      this.combineDataAndUpdate(updateCallback);
    });

    this.relapses.listenToChanges(() => {
      this.combineDataAndUpdate(updateCallback);
    });
  }

  private combineDataAndUpdate(callback: (data: any) => void): void {
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

export default UserData;
