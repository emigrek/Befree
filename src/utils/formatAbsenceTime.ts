import { formatDistanceToNow, subMilliseconds } from 'date-fns';

interface FormatAbsenceTimeProps {
  absenceTime: number;
}

export const formatAbsenceTime = ({ absenceTime }: FormatAbsenceTimeProps) => {
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

  if (absenceTime < 3 * 1000) {
    return formatDistanceToNow(subMilliseconds(new Date(), absenceTime));
  }

  return `${y}${d}${h}${m}${s}`;
};
