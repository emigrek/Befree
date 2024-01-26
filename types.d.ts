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
  tags: string[];
  hidden: boolean;
  createdAt: Date;
}

interface Relapse {
  id: string;
  addictionId: string;
  createdAt: Date;
}

interface Goal {
  goalAt: Date;
  goalType: `${GoalType}`;
}

type UnidentifiedAddiction = Omit<Addiction, 'id' | 'createdAt'>;

type UnidentifiedRelapse = Omit<Relapse, 'id' | 'createdAt'>;
