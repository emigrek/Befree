import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { customAlphabet } from 'nanoid/non-secure';

import RelapseManager from './relapse';

import { addictionRef, addictionsRef } from '@/services/refs/addictions';
import { addictionImageRef } from '@/services/refs/image';
import { addictionRelapsesRef } from '@/services/refs/relapses';
import { parseFirebaseTimestamp } from '@/utils/parseFirebaseTimestamp';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

class AddictionManager {
  private userId: string;
  private data: Addiction[] = [];
  private relapses: RelapseManager;
  private unsubscribeFromChanges: () => void = () => {};

  constructor(userId: string) {
    this.userId = userId;
    this.relapses = new RelapseManager(userId);
  }

  public async create(
    addiction: UnidentifiedAddiction,
    firstRelapseDate?: Date,
  ): Promise<string> {
    try {
      const id = nanoid();

      await addictionRef(this.userId, id).set({
        ...addiction,
        id,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      if (firstRelapseDate) {
        await this.relapses.create({
          addictionId: id,
          relapseAt: firstRelapseDate,
        });
      }

      return id;
    } catch (error) {
      console.error('Error adding addiction: ', error);
      throw error;
    }
  }

  public async update(
    id: string,
    addiction: Partial<UnidentifiedAddiction>,
  ): Promise<void> {
    try {
      await addictionRef(this.userId, id).update(addiction);
    } catch (error) {
      console.error('Error updating addiction: ', error);
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await addictionRef(this.userId, id).delete();
    } catch (error) {
      console.error('Error removing addiction: ', error);
      throw error;
    }

    try {
      const relapses = await addictionRelapsesRef(this.userId, id).get();
      relapses.docs.forEach(relapse => relapse.ref.delete());
    } catch (error) {
      console.error('Error removing addiction relapses: ', error);
      throw error;
    }

    try {
      await addictionImageRef(this.userId, id).delete();
    } catch (error) {
      console.log('Error removing addiction image (doesn`t exist): ', error);
    }
  }

  listenToChanges(updateCallback: (addictions: Addiction[]) => void): void {
    this.unsubscribeFromChanges = addictionsRef(this.userId).onSnapshot(
      snapshot => {
        this.data = snapshot.docs.map(doc => {
          return this.parseData(doc.data());
        });
        updateCallback(this.data);
      },
      error => {
        console.error('Error listening to Addictions collection: ', error);
      },
    );
  }

  parseData(data: FirebaseFirestoreTypes.DocumentData): Addiction {
    return {
      id: data.id,
      name: data.name,
      image: data.image,
      relapses: [],
      hidden: data.hidden,
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

export default AddictionManager;
