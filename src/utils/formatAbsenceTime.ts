import { formatDistanceToNow, subMilliseconds } from 'date-fns';

interface FormatAbsenceTimeProps {
  absenceTime: number;
  toNow?: boolean;
}

export const formatAbsenceTime = ({
  absenceTime,
  toNow = false,
}: FormatAbsenceTimeProps) => {
  const years = Math.floor(absenceTime / (1000 * 60 * 60 * 24 * 365));
  const days = Math.floor(absenceTime / (1000 * 60 * 60 * 24) - years * 365);
  const hours = Math.floor((absenceTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((absenceTime / (1000 * 60)) % 60);
  const seconds = Math.floor((absenceTime / 1000) % 60);

  const y = years ? `${years}y ` : '';
  const d = days ? `${days}d ` : '';
  const h = hours ? `${hours}h ` : '';
  const m = minutes ? `${minutes}m ` : '';
  const s = `${seconds}s`;

  if (toNow) {
    return formatDistanceToNow(subMilliseconds(new Date(), absenceTime));
  }

  return `${y}${d}${h}${m}${s}`;
};
