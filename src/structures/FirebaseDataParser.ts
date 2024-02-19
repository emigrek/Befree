import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { FirebaseAddiction } from './Addiction';
import { FirebaseRelapse } from './Relapse';

import { parseFirebaseTimestamp } from '@/utils/firebase';

class FirebaseDataParser {
  static parseAddictionData(
    data: FirebaseFirestoreTypes.DocumentData,
  ): FirebaseAddiction {
    return {
      id: data.id,
      name: data.name,
      image: data.image,
      relapses: data.relapses.map(
        (relapse: FirebaseFirestoreTypes.DocumentData) =>
          FirebaseDataParser.parseRelapseData(relapse),
      ),
      hidden: data.hidden,
      startedAt: parseFirebaseTimestamp(data.startedAt),
      createdAt: parseFirebaseTimestamp(data.createdAt),
    };
  }

  static parseRelapseData(
    data: FirebaseFirestoreTypes.DocumentData,
  ): FirebaseRelapse {
    return {
      id: data.id,
      note: data.note,
      addictionId: data.addictionId,
      relapseAt: parseFirebaseTimestamp(data.relapseAt),
      createdAt: parseFirebaseTimestamp(data.createdAt),
    };
  }
}

export { FirebaseDataParser };
