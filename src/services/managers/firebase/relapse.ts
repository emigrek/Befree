import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { customAlphabet } from 'nanoid/non-secure';

import { relapseRef, relapsesRef } from '@/services/refs/relapses';
import {
  firebaseTimestampField,
  parseFirebaseTimestamp,
} from '@/utils/firebase';
import { hasNetworkConnection } from '@/utils/hasNetworkConnection';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

class RelapseManager {
  private userId: string;
  private data: Relapse[] = [];
  private unsubscribeFromChanges: () => void = () => {};

  constructor(userId: string) {
    this.userId = userId;
  }

  public async create(relapse: UnidentifiedRelapse): Promise<Relapse> {
    const isConnected = await hasNetworkConnection();
    const id = nanoid();
    const ref = relapseRef(this.userId, id);
    const payload = {
      ...relapse,
      id,
      createdAt: firebaseTimestampField,
    };

    try {
      if (isConnected) {
        await ref.set(payload);
      } else {
        ref.set(payload);
      }
    } catch (error) {
      console.error('Error creating relapse: ', error);
    }

    return {
      ...relapse,
      id,
      createdAt: new Date(),
    };
  }

  public async update(id: string, relapse: Partial<UnidentifiedRelapse>) {
    const isConnected = await hasNetworkConnection();
    const ref = relapseRef(this.userId, id);

    try {
      if (isConnected) {
        await ref.update(relapse);
      } else {
        ref.update(relapse);
      }
    } catch (error) {
      console.log('Error updating addiction: ', error);
    }
  }

  public async delete(id: string): Promise<void> {
    const isConnected = await hasNetworkConnection();

    try {
      if (isConnected) {
        await relapseRef(this.userId, id).delete();
      } else {
        relapseRef(this.userId, id).delete();
      }
    } catch (error) {
      console.log('Error removing relapse: ', error);
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
      note: data.note,
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

export { RelapseManager };
