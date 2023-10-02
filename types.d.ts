interface Addiction {
  id: string;
  name: string;
  startDate: Date;
  image: string | null;
  tags: string[];
}

type UnidentifiedAddiction = Omit<Addiction, 'id'>;
