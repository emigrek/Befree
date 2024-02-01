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

  public async create(relapse: UnidentifiedRelapse): Promise<Relapse | null> {
    try {
      const id = nanoid();
      const ref = relapseRef(this.userId, id);

      await ref.set({
        ...relapse,
        id,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      return await ref.get().then(doc => {
        const data = doc.data();

        if (!data) {
          return null;
        }

        return this.parseRelapseData(data);
      });
    } catch (error) {
      console.error('Error adding relapse: ', error);
      throw error;
    }
  }

  public async update(
    id: string,
    relapse: Partial<UnidentifiedRelapse>,
  ): Promise<Relapse | null> {
    try {
      const ref = relapseRef(this.userId, id);

      await ref.update(relapse);

      return await ref.get().then(doc => {
        const data = doc.data();

        if (!data) {
          return null;
        }

        return this.parseRelapseData(data);
      });
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
        this.data = snapshot.docs.map(doc =>
          this.parseRelapseData(doc.data()),
        ) as Relapse[];
        updateCallback(this.data);
      },
      error => {
        console.error('Error listening to Relapses collection: ', error);
      },
    );
  }

  parseRelapseData(data: FirebaseFirestoreTypes.DocumentData): Relapse {
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
