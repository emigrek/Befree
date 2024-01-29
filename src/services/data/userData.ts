import AddictionManager from './managers/addiction';
import RelapseManager from './managers/relapse';

class UserData {
  private static instance: UserData | null = null;

  private userId: string;
  public addictions: AddictionManager;
  public relapses: RelapseManager;

  private constructor(userId: string) {
    this.userId = userId;
    this.addictions = new AddictionManager(userId);
    this.relapses = new RelapseManager(userId);
  }

  public static getInstance(userId: string): UserData {
    if (!UserData.instance) {
      UserData.instance = new UserData(userId);
    }

    return UserData.instance;
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
      relapses: relapsesData
        .filter(relapse => relapse.addictionId === addiction.id)
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()),
    }));

    callback(combinedData);
  }

  unsubscribeFromChanges(): void {
    this.addictions.unsubscribe();
    this.relapses.unsubscribe();
  }
}

export default UserData;
