import { customAlphabet } from 'nanoid/non-secure';

import { relapseRef, relapsesRef } from '@/services/refs/relapses';
import {
  FirebaseDataParser,
  FirebaseRelapse,
  Relapse,
  UnidentifiedFirebaseRelapse,
} from '@/structures';
import { firebaseTimestampField } from '@/utils/firebase';
import { hasNetworkConnection } from '@/utils/hasNetworkConnection';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

class RelapseManager {
  private userId: string;
  private data: FirebaseRelapse[] = [];
  private unsubscribeFromChanges: () => void = () => {};

  constructor(userId: string) {
    this.userId = userId;
  }

  public async create(relapse: UnidentifiedFirebaseRelapse): Promise<Relapse> {
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

    return new Relapse({
      ...relapse,
      id,
      createdAt: new Date(),
    });
  }

  public async update(
    id: string,
    relapse: Partial<UnidentifiedFirebaseRelapse>,
  ) {
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

  listenToChanges(updateCallback: (relapses: FirebaseRelapse[]) => void): void {
    this.unsubscribeFromChanges = relapsesRef(this.userId).onSnapshot(
      snapshot => {
        this.data = snapshot.docs.map(doc =>
          FirebaseDataParser.parseRelapseData(doc.data()),
        );
        updateCallback(this.data);
      },
      error => {
        console.error('Error listening to Relapses collection: ', error);
      },
    );
  }

  getRelapsesData(): FirebaseRelapse[] {
    return this.data;
  }

  unsubscribe(): void {
    this.unsubscribeFromChanges();
  }
}

export { RelapseManager };
