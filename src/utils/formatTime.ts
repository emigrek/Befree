import { formatDistanceToNow, subMilliseconds } from 'date-fns';

interface FormatTimeProps {
  time: number;
  toNow?: boolean;
}

export const formatTime = ({ time, toNow = false }: FormatTimeProps) => {
  const years = Math.floor(time / (1000 * 60 * 60 * 24 * 365));
  const weeks = Math.floor(time / (1000 * 60 * 60 * 24 * 7) - years * 52);
  const days = Math.floor(time / (1000 * 60 * 60 * 24) - years * 365);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  const y = years ? `${years}y ` : '';
  const w = weeks ? `${weeks}w ` : '';
  const d = days ? `${days}d ` : '';
  const h = hours ? `${hours}h ` : '';
  const m = minutes ? `${minutes}m ` : '';
  const s = `${seconds}s`;

  if (toNow) {
    return formatDistanceToNow(subMilliseconds(new Date(), time));
  }

  return `${y}${w}${d}${h}${m}${s}`;
};
