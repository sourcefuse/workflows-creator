import {parseUtcLikeMoment, UtcLikeFormat} from './date-parse.util';

const DATE: UtcLikeFormat = 'YYYY-MM-DD';
const DATE_TIME: UtcLikeFormat = 'YYYY-MM-DD hh:mm';

// Expected values come from Moment 2.31: `moment.utc(text, format)`.
const CASES: [unknown, UtcLikeFormat, string | null][] = [
  ['2026-11-17', DATE, '2026-11-17T00:00:00.000Z'],
  ['2024-02-29', DATE, '2024-02-29T00:00:00.000Z'],
  ['2000-02-29', DATE, '2000-02-29T00:00:00.000Z'],
  ['2026-1-5', DATE, '2026-01-05T00:00:00.000Z'],
  ['99-1-1', DATE, '1999-01-01T00:00:00.000Z'],
  ['26-1-1', DATE, '2026-01-01T00:00:00.000Z'],
  ['2026-02-29', DATE, null],
  ['2026-02-30', DATE, null],
  ['2026-04-31', DATE, null],
  ['2026-13-01', DATE, null],
  ['1900-02-29', DATE, null],
  ['abc', DATE, null],
  ['', DATE, null],
  [null, DATE, null],
  ['1794909600000', DATE, null],
  ['2026-11-17 13:05', DATE_TIME, '2026-11-17T13:05:00.000Z'],
  ['2026-11-17 9:5', DATE_TIME, '2026-11-17T09:05:00.000Z'],
  ['2026-11-17', DATE_TIME, '2026-11-17T00:00:00.000Z'],
  ['2026-11-17 24:00', DATE_TIME, '2026-11-18T00:00:00.000Z'],
  ['2026-12-31 24:00', DATE_TIME, '2027-01-01T00:00:00.000Z'],
  ['2026-11-17 00:00', DATE_TIME, '2026-11-17T00:00:00.000Z'],
  ['2026-11-17T10:30:00.000Z', DATE_TIME, '2026-11-17T10:30:00.000Z'],
  ['202611171030', DATE_TIME, '2026-11-17T10:30:00.000Z'],
  ['20261117', DATE, '2026-11-17T00:00:00.000Z'],
  // Each separator is searched in the remaining text, so it can skip digits.
  ['12 3-4', DATE, '2012-04-01T00:00:00.000Z'],
  // Leap years, including the early years a Date would map to 19xx.
  ['0000-02-29', DATE, '0000-02-29T00:00:00.000Z'],
  ['0004-02-29', DATE, '0004-02-29T00:00:00.000Z'],
  ['0400-02-29', DATE, '0400-02-29T00:00:00.000Z'],
  ['0100-02-29', DATE, null],
  ['2026-00-10', DATE, null],
  ['2026-10-00', DATE, null],
  ['-', DATE, null],
  ['2026-11-17 24:01', DATE_TIME, null],
  ['2026-11-17 25:00', DATE_TIME, null],
  ['2026-11-17 10:60', DATE_TIME, null],
];

describe('parseUtcLikeMoment', () => {
  CASES.forEach(([text, format, expected]) => {
    it(`reads ${JSON.stringify(text)} with "${format}" like Moment`, () => {
      const result = parseUtcLikeMoment(text, format);

      expect(result.isValid()).toBe(expected !== null);
      if (expected !== null) {
        expect(result.toISOString()).toBe(expected);
      }
    });
  });

  it('defaults missing month and day like Moment', () => {
    expect(parseUtcLikeMoment('2026', DATE).toISOString()).toBe(
      '2026-01-01T00:00:00.000Z',
    );
    expect(parseUtcLikeMoment('2026-11', DATE).toISOString()).toBe(
      '2026-11-01T00:00:00.000Z',
    );
  });

  it('formats the result in UTC like the date prompts display it', () => {
    expect(
      parseUtcLikeMoment('2026-11-17 13:05', DATE_TIME).format(
        'MMM DD, YYYY hh:mm A',
      ),
    ).toBe('Nov 17, 2026 01:05 PM');
  });
});
