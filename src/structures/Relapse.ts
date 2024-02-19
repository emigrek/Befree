interface FirebaseRelapse {
  id: string;
  addictionId: string;
  relapseAt: Date;
  createdAt: Date;
  note: string;
}

type UnidentifiedFirebaseRelapse = Omit<FirebaseRelapse, 'id' | 'createdAt'>;

class Relapse {
  id: string;
  addictionId: string;
  relapseAt: Date;
  createdAt: Date;
  note: string;

  constructor(relapse: FirebaseRelapse) {
    this.id = relapse.id;
    this.addictionId = relapse.addictionId;
    this.relapseAt = relapse.relapseAt;
    this.createdAt = relapse.createdAt;
    this.note = relapse.note;
  }

  get isStartedRelapse(): boolean {
    return this.id === 'startedAt';
  }
}

export { FirebaseRelapse, Relapse, UnidentifiedFirebaseRelapse };
