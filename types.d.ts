interface Addiction {
  id: string;
  name: string;
  relapses: Date[];
  image: string | null;
  tags: string[];
  createdAt: Date;
}

interface Goal {
  goalAt: Date;
  goalType: `${GoalType}`;
}

type UnidentifiedAddiction = Omit<Addiction, 'id' | 'createdAt'>;
