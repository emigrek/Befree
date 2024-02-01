interface User {
  id: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  createdAt: Date;
}

interface Addiction {
  id: string;
  name: string;
  image: string | null;
  relapses: Relapse[];
  hidden: boolean;
  startedAt: Date;
  createdAt: Date;
}

interface Relapse {
  id: string;
  addictionId: string;
  relapseAt: Date;
  createdAt: Date;
}

interface Goal {
  goalAt: Date;
  goalType: `${GoalType}`;
}

type UnidentifiedAddiction = Omit<Addiction, 'id' | 'createdAt'>;

type UnidentifiedRelapse = Omit<Relapse, 'id' | 'createdAt'>;
