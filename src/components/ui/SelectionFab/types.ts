export interface SelectionFabType {
  id: number;
  icon: string;
  onPress: () => Promise<void>;
  size?: number;
  color?: string;
  backgroundColor?: string;
}
