interface User {
  id: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  createdAt: Date;
}

interface Achievement {
  goal: Goal;
  progress: number;
  achievedAt?: Date;
}
