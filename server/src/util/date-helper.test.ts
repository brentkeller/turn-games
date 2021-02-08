import { parseJSON } from 'date-fns';
import {
  calculateDuration,
  getDurationString,
  getDisplayString,
  dateFormats,
  getDateHash,
  dateHashToDate,
} from './date-helper';

const startTime = '2018-11-01T08:00:00';
const endTime = '2018-11-01T09:10:00';

const sampleJsonDate = `2019-10-30T12:31:09.690Z`;
const sampleJsonUtcString = `2019-10-30T00:00:00`;
// Have to use UTC here because we're concerned with the time
const sampleDate = new Date(Date.UTC(2019, 9, 30, 12, 31, 9, 690)); // Oct 30, 2019 12:31:09
const sampleDateMidnight = new Date(2019, 9, 30); // Oct 30, 2019; Midnight with local tz offset
const sampleDateHash = `20191030`;

describe('calculateDuration', () => {
  test('should return zero when start is null', () => {
    const end = new Date();
    expect(calculateDuration(null, end)).toEqual(0);
  });

  test('should return zero when end is null', () => {
    const start = new Date();
    expect(calculateDuration(start, null)).toEqual(0);
  });

  test('should return the minutes between the dates', () => {
    const start = parseJSON(startTime);
    const end = parseJSON(endTime);
    expect(calculateDuration(start, end)).toEqual(70);
  });
});

describe('getDurationString', () => {
  test('should return empty string when duration is null', () => {
    expect(getDurationString(null)).toEqual('');
  });

  test('should return minutes only when duration is under 60 mins', () => {
    expect(getDurationString(59)).toEqual('59m');
  });

  test('should return hours and minutes when duration is over 59 mins', () => {
    expect(getDurationString(60)).toEqual('1h 0m');
  });

  test('should return whole hours and minutes when values are decimal', () => {
    expect(getDurationString(60.442)).toEqual('1h 0m');
  });
});

describe('getDisplayString', () => {
  test('should return empty string when date is undefined', () => {
    expect(getDisplayString(undefined)).toEqual('');
  });

  test('should return empty string when date is null', () => {
    expect(getDisplayString(null)).toEqual('');
  });

  test('should return niceDayString format when no format is passed', () => {
    expect(getDisplayString(startTime)).toEqual("Thu November 1st '18");
  });

  test('should return date formatted using provided date format', () => {
    expect(getDisplayString(startTime, dateFormats.dateHash)).toEqual('20181101');
  });

  test('should return date formatted using provided date format with time', () => {
    expect(getDisplayString(startTime, dateFormats.niceDayWith12HrTime)).toEqual(
      "Thu Nov 1st '18 4:00a",
    );
  });
});

describe('getDateHash', () => {
  it('returns a date hash string when passed a JSON date string', () => {
    const actual = getDateHash(sampleJsonDate);
    expect(actual).toEqual(sampleDateHash);
  });

  it('returns a date hash string when passed a date object', () => {
    const actual = getDateHash(sampleDate);
    expect(actual).toEqual(sampleDateHash);
  });
});

describe('dateHashToDate', () => {
  it('returns a date from a date hash string', () => {
    const actual = dateHashToDate(sampleDateHash);
    expect(actual).toEqual(sampleDateMidnight);
  });
});
