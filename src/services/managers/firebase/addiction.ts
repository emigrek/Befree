import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { customAlphabet } from 'nanoid/non-secure';

import { addictionRef, addictionsRef } from '@/services/refs/addictions';
import { addictionImageRef } from '@/services/refs/image';
import { addictionRelapsesRef } from '@/services/refs/relapses';
import { FirebaseDataParser, FirebaseRelapse, Relapse } from '@/structures';
import {
  Addiction,
  FirebaseAddiction,
  UnidentifiedFirebaseAddiction,
} from '@/structures/Addiction';
import { firebaseTimestampField } from '@/utils/firebase';
import { hasNetworkConnection } from '@/utils/hasNetworkConnection';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

class AddictionManager {
  private userId: string;
  private data: FirebaseAddiction[] = [];
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

      const addictionData = FirebaseDataParser.parseAddictionData(
        doc.data() as FirebaseFirestoreTypes.DocumentData,
      );

      const relapses = await this.getAllRelapses(id);

      addictionData.relapses = relapses.map(relapse => new Relapse(relapse));

      return new Addiction(addictionData);
    } catch (e) {
      console.log('Error getting addiction: ', e);
      return null;
    }
  }

  public async create(
    addiction: UnidentifiedFirebaseAddiction,
  ): Promise<Addiction> {
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

    return new Addiction({
      ...addiction,
      id,
      createdAt: new Date(),
    });
  }

  public async update(
    id: string,
    addiction: Partial<UnidentifiedFirebaseAddiction>,
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

  async getAllRelapses(addictionId: string): Promise<FirebaseRelapse[]> {
    return addictionRelapsesRef(this.userId, addictionId)
      .get()
      .then(snapshot =>
        snapshot.docs.map(doc =>
          FirebaseDataParser.parseRelapseData(doc.data()),
        ),
      );
  }

  listenToChanges(
    updateCallback: (addictions: FirebaseAddiction[]) => void,
  ): void {
    this.unsubscribeFromChanges = addictionsRef(this.userId).onSnapshot(
      snapshot => {
        this.data = snapshot.docs.map(doc =>
          FirebaseDataParser.parseAddictionData(doc.data()),
        );
        updateCallback(this.data);
      },
      error => {
        console.error('Error listening to Addictions collection: ', error);
      },
    );
  }

  getAddictionsData(): FirebaseAddiction[] {
    return this.data;
  }

  unsubscribe(): void {
    this.unsubscribeFromChanges();
  }
}

export { AddictionManager };
