import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { customAlphabet } from 'nanoid/non-secure';

import { RelapseManager } from './relapse';

import { addictionRef, addictionsRef } from '@/services/refs/addictions';
import { addictionImageRef } from '@/services/refs/image';
import { addictionRelapsesRef } from '@/services/refs/relapses';
import {
  firebaseTimestampField,
  parseFirebaseTimestamp,
} from '@/utils/firebase';
import { hasNetworkConnection } from '@/utils/hasNetworkConnection';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

class AddictionManager {
  private userId: string;
  private data: Addiction[] = [];
  private unsubscribeFromChanges: () => void = () => {};

  constructor(userId: string) {
    this.userId = userId;
  }

  public async get(id: string): Promise<Addiction | null> {
    const ref = addictionRef(this.userId, id);

    try {
      const doc = await ref.get();

      if (!doc.exists) {
        return null;
      }

      const addictionData = this.parseAddictionData(
        doc.data() as FirebaseFirestoreTypes.DocumentData,
      );

      addictionData.relapses = await this.getAllRelapses(id);

      return addictionData;
    } catch (e) {
      console.log('Error getting addiction: ', e);
      return null;
    }
  }

  public async create(addiction: UnidentifiedAddiction): Promise<Addiction> {
    const isConnected = await hasNetworkConnection();
    const id = nanoid();
    const ref = addictionRef(this.userId, id);
    const payload = {
      ...addiction,
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
      console.log('Error creating addiction: ', error);
    }

    return {
      ...addiction,
      id,
      createdAt: new Date(),
    };
  }

  public async update(
    id: string,
    addiction: Partial<UnidentifiedAddiction>,
  ): Promise<void> {
    const isConnected = await hasNetworkConnection();
    const ref = addictionRef(this.userId, id);

    try {
      if (isConnected) {
        await ref.update(addiction);
      } else {
        ref.update(addiction);
      }
    } catch (error) {
      console.log('Error updating addiction: ', error);
    }
  }

  public async delete(id: string): Promise<void> {
    const isConnected = await hasNetworkConnection();

    try {
      if (isConnected) {
        await addictionRef(this.userId, id).delete();
      } else {
        addictionRef(this.userId, id).delete();
      }
    } catch (error) {
      console.log('Error removing addiction: ', error);
    }

    try {
      const relapses = await addictionRelapsesRef(this.userId, id).get();
      const batch = firestore().batch();

      relapses.forEach(doc => {
        batch.delete(doc.ref);
      });

      batch.commit();
    } catch (error) {
      console.log('Error removing addiction relapses: ', error);
    }

    try {
      if (isConnected) {
        await addictionImageRef(this.userId, id).delete();
      } else {
        addictionImageRef(this.userId, id).delete();
      }
    } catch (error) {
      console.log('Error removing addiction image (doesn`t exist): ', error);
    }
  }

  getAllRelapses(addictionId: string): Promise<Relapse[]> {
    return addictionRelapsesRef(this.userId, addictionId)
      .get()
      .then(snapshot =>
        snapshot.docs.map(doc =>
          new RelapseManager(this.userId).parseRelapseData(doc.data()),
        ),
      );
  }

  listenToChanges(updateCallback: (addictions: Addiction[]) => void): void {
    this.unsubscribeFromChanges = addictionsRef(this.userId).onSnapshot(
      snapshot => {
        this.data = snapshot.docs.map(doc =>
          this.parseAddictionData(doc.data()),
        );
        updateCallback(this.data);
      },
      error => {
        console.error('Error listening to Addictions collection: ', error);
      },
    );
  }

  parseAddictionData(data: FirebaseFirestoreTypes.DocumentData): Addiction {
    return {
      id: data.id,
      name: data.name,
      image: data.image,
      relapses: [],
      hidden: data.hidden,
      startedAt: parseFirebaseTimestamp(data.startedAt),
      createdAt: data.createdAt
        ? parseFirebaseTimestamp(data.createdAt)
        : new Date(),
    };
  }

  getAddictionsData(): Addiction[] {
    return this.data;
  }

  unsubscribe(): void {
    this.unsubscribeFromChanges();
  }
}

export { AddictionManager };
