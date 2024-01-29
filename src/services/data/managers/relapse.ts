import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { customAlphabet } from 'nanoid/non-secure';

import { relapseRef, relapsesRef } from '@/services/refs/relapses';
import { parseFirebaseTimestamp } from '@/utils/parseFirebaseTimestamp';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

class RelapseManager {
  private userId: string;
  private data: Relapse[] = [];
  private unsubscribeFromChanges: () => void = () => {};

  constructor(userId: string) {
    this.userId = userId;
  }

  public async create(relapse: UnidentifiedRelapse): Promise<string> {
    try {
      const id = nanoid();
      await relapseRef(this.userId, id).set({
        ...relapse,
        id,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      return id;
    } catch (error) {
      console.error('Error adding relapse: ', error);
      throw error;
    }
  }

  public async update(
    id: string,
    relapse: Partial<UnidentifiedRelapse>,
  ): Promise<void> {
    try {
      await relapseRef(this.userId, id).update(relapse);
    } catch (error) {
      console.error('Error updating relapse: ', error);
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await relapseRef(this.userId, id).delete();
    } catch (error) {
      console.error('Error removing relapse: ', error);
      throw error;
    }
  }

  listenToChanges(updateCallback: (relapses: Relapse[]) => void): void {
    this.unsubscribeFromChanges = relapsesRef(this.userId).onSnapshot(
      snapshot => {
        this.data = snapshot.docs.map(doc => {
          return this.parseData(doc.data());
        }) as Relapse[];
        updateCallback(this.data);
      },
      error => {
        console.error('Error listening to Relapses collection: ', error);
      },
    );
  }

  parseData(data: FirebaseFirestoreTypes.DocumentData): Relapse {
    return {
      id: data.id,
      addictionId: data.addictionId,
      relapseAt: parseFirebaseTimestamp(data.relapseAt),
      createdAt: data.createdAt
        ? parseFirebaseTimestamp(data.createdAt)
        : new Date(),
    };
  }

  getRelapsesData(): Relapse[] {
    return this.data;
  }

  unsubscribe(): void {
    this.unsubscribeFromChanges();
  }
}

export default RelapseManager;
