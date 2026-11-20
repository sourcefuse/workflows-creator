import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

// Registering a plugin is idempotent, and the host application's own Day.js
// setup (same instance) applies on top of this one.
dayjs.extend(customParseFormat);
dayjs.extend(utc);

/** The formats the date prompts display with; the only ones this parser reads. */
export type UtcLikeFormat = 'YYYY-MM-DD' | 'YYYY-MM-DD hh:mm';

type DateField = 'year' | 'month' | 'day' | 'hour' | 'minute';
type DateFields = Partial<Record<DateField, number>>;

/** A token of the format: found anywhere in the remaining text, then consumed. */
interface ParseStep {
  pattern: RegExp;
  /** Absent for literal separators, which are consumed but not stored. */
  field?: DateField;
}

const DATE_STEPS: ParseStep[] = [
  {pattern: /\d{1,4}/, field: 'year'},
  {pattern: /-/},
  {pattern: /\d\d?/, field: 'month'},
  {pattern: /-/},
  {pattern: /\d\d?/, field: 'day'},
];
const TIME_STEPS: ParseStep[] = [
  {pattern: / /},
  {pattern: /\d\d?/, field: 'hour'},
  {pattern: /:/},
  {pattern: /\d\d?/, field: 'minute'},
];
const FORMAT_STEPS: Record<UtcLikeFormat, ParseStep[]> = {
  'YYYY-MM-DD': DATE_STEPS,
  'YYYY-MM-DD hh:mm': [...DATE_STEPS, ...TIME_STEPS],
};

const TWO_DIGIT_YEAR_LENGTH = 2;
const TWO_DIGIT_YEAR_PIVOT = 68;
const END_OF_DAY_HOUR = 24;

function toFieldValue(field: DateField, found: string): number {
  const value = Number(found);
  if (field === 'year' && found.length === TWO_DIGIT_YEAR_LENGTH) {
    return value + (value > TWO_DIGIT_YEAR_PIVOT ? 1900 : 2000);
  }
  return value;
}

/**
 * Moment's non-strict token matching: every token is looked for anywhere in
 * the remaining text, so `2026-1-5` and `20261117` are read, while Day.js's
 * loose parse expects each separator at a fixed position.
 * Returns `null` when nothing could be read.
 */
function readFields(text: unknown, steps: ParseStep[]): DateFields | null {
  const fields: DateFields = {};
  let rest = String(text);
  for (const {pattern, field} of steps) {
    const found = pattern.exec(rest);
    if (!found) {
      continue;
    }
    rest = rest.slice(found.index + found[0].length);
    if (field) {
      fields[field] = toFieldValue(field, found[0]);
    }
  }
  return Object.keys(fields).length ? fields : null;
}

/**
 * Builds the UTC date, or an invalid one when a part is out of range.
 * Date setters roll an impossible value over (`02-30` becomes `03-02`), so the
 * date is read back through Day.js and must still hold what was written.
 * `24:00` is accepted as midnight of the next day, as Moment does.
 */
function toUtcDate(fields: DateFields): dayjs.Dayjs {
  // A year is always read first, so only the parts after it can be missing.
  const {year = Number.NaN, month = 1, day = 1, hour = 0, minute = 0} = fields;
  const endOfDay = hour === END_OF_DAY_HOUR && minute === 0;
  const storedHour = endOfDay ? 0 : hour;

  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  date.setUTCHours(storedHour, minute, 0, 0);

  const result = dayjs.utc(date);
  const written = [year, month - 1, day, storedHour, minute];
  const read = [
    result.year(),
    result.month(),
    result.date(),
    result.hour(),
    result.minute(),
  ];
  if (!written.every((value, index) => value === read[index])) {
    return dayjs.utc(Number.NaN);
  }
  return endOfDay ? result.add(1, 'day') : result;
}

/**
 * Moment's non-strict `moment.utc(text, format)` for the numeric formats the
 * date prompts display with. Missing parts default like Moment (month January,
 * day 1, time 00:00) and impossible dates are invalid, where Day.js's loose
 * parse rolls them over (`2026-02-30` shows Mar 02) or rejects text Moment
 * read, such as `2026-1-5` or a date without the time.
 *
 * @param text value to parse
 * @param format one of the display formats
 * @returns the UTC date, or an invalid Day.js date when `text` cannot be read
 */
export function parseUtcLikeMoment(
  text: unknown,
  format: UtcLikeFormat,
): dayjs.Dayjs {
  const fields = readFields(text, FORMAT_STEPS[format]);
  return fields ? toUtcDate(fields) : dayjs.utc(Number.NaN);
}
