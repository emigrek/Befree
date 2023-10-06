import { FC } from 'react';
import { TextProps } from 'react-native-paper';

import { Bold } from '@/components/ui/Text';
import { useFreeFor } from '@/services/firestore';

interface FreeForProps extends Omit<TextProps<string>, 'children'> {
  addiction: Addiction;
}

const FreeFor: FC<FreeForProps> = ({ addiction, ...props }) => {
  const { freeForTime } = useFreeFor({ addiction });

  const format = (time: number) => {
    const years = Math.floor(time / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor(time / (1000 * 60 * 60 * 24) - years * 365);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    const y = years ? `${years}y ` : '';
    const d = days ? `${days}d ` : '';
    const h = hours ? `${hours}h ` : '';
    const m = minutes ? `${minutes}m ` : '';
    const s = `${seconds}s`;

    return `${y}${d}${h}${m}${s}`;
  };

  return <Bold {...props}>{format(freeForTime)}</Bold>;
};

export { FreeFor };
