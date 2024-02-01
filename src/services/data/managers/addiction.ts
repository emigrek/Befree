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
  ): Promise<Addiction | null> {
    try {
      const id = nanoid();
      const ref = addictionRef(this.userId, id);

      await ref.set({
        ...addiction,
        id,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      return await ref.get().then(doc => {
        const data = doc.data();

        if (!data) {
          return null;
        }

        return this.parseAddictionData(data);
      });
    } catch (error) {
      console.error('Error adding addiction: ', error);
      throw error;
    }
  }

  public async update(
    id: string,
    addiction: Partial<UnidentifiedAddiction>,
  ): Promise<Addiction | null> {
    try {
      const ref = addictionRef(this.userId, id);

      await ref.update(addiction);

      return await ref.get().then(doc => {
        const data = doc.data();

        if (!data) {
          return null;
        }

        return this.parseAddictionData(data);
      });
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

export default AddictionManager;
