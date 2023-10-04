interface Addiction {
  id: string;
  name: string;
  startDate: Date;
  image: string | null;
  tags: string[];
}

interface Goal {
  goalAt: Date;
  goalType: `${GoalType}`;
}

type UnidentifiedAddiction = Omit<Addiction, 'id'>;
