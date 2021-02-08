import { differenceInMinutes, format, parse, parseJSON } from 'date-fns';

export const calculateDuration = (start: Date, end: Date): number => {
  if (!start || !end) return 0;
  return differenceInMinutes(end, start);
};

export const getDurationString = (duration: number): string => {
  if (!duration) return '';
  const mins = Math.floor(duration % 60);
  const hrs = Math.floor((duration - mins) / 60);
  if (hrs > 0) return `${hrs}h ${mins}m`;
  return `${mins}m`;
};

export function getDurationFromNow(start?: Date) {
  if (!start) return '';
  const now = new Date();
  const duration = calculateDuration(start, now);
  return getDurationString(duration);
}

export const getDateHash = (date: string | Date) => format(getDate(date), dateFormats.dateHash);

export const dateHashToDate = (hash: string) => parse(hash, dateFormats.dateHash, new Date());

export const dateFormats = {
  dateHash: `yyyyMMdd`,
  niceDayString: `iii MMMM do ''yy`,
  niceDayWith12HrTime: `iii MMM do ''yy h:mmaaaaa`,
  utcString: `yyyy-MM-dd'T'00:00:00`, // escaped T to get desired format
};

export const getDate = (date: Date | string) => (typeof date === 'string' ? parseJSON(date) : date);

export const getDisplayString = (
  date: Date | string | undefined,
  dateFormat = dateFormats.niceDayString,
) => {
  if (!date) return '';
  return format(getDate(date), dateFormat);
};
