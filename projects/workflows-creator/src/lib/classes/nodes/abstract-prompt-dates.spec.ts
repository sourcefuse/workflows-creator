import {InputTypes} from '../../enum';
import {State} from '../state';
import {WorkflowPrompt} from './abstract-prompt.class';

class TestPrompt extends WorkflowPrompt {
  suffix = undefined;
  prefix = undefined;
  inputKey = 'when';
  placeholder = '';
  constructor(private readonly type: InputTypes) {
    super();
  }
  typeFunction = () => this.type;
  getIdentifier = () => 'test';
}

const stateWith = (value: unknown) =>
  ({get: () => value} as unknown as State<Record<string, unknown>>);

describe('WorkflowPrompt dates (Day.js)', () => {
  const datePrompt = new TestPrompt(InputTypes.Date);
  const dateTimePrompt = new TestPrompt(InputTypes.DateTime);
  const state = stateWith(undefined);

  describe('setValue', () => {
    it('stores a Date as local midnight of the chosen day', () => {
      const result = datePrompt.setValue(state, {
        year: 2026,
        month: 2,
        day: 1,
      }) as string;

      expect(result.startsWith('2026-02-01T00:00:00')).toBe(true);
    });

    it('pads single digit day and month', () => {
      const result = datePrompt.setValue(state, {
        year: 2026,
        month: 3,
        day: 9,
      }) as string;

      expect(result.startsWith('2026-03-09T00:00:00')).toBe(true);
    });

    it('stores a DateTime with the chosen hour and minute', () => {
      const result = dateTimePrompt.setValue(state, {
        date: {year: 2026, month: 11, day: 17},
        time: {hour: 10, minute: 5, second: 0},
      }) as string;

      expect(result.startsWith('2026-11-17T10:05:00')).toBe(true);
    });
  });

  describe('getValueName', () => {
    it('shows a Date', () => {
      expect(datePrompt.getValueName(stateWith('2026-11-17'))).toBe(
        'Nov 17, 2026',
      );
    });

    it('shows a DateTime', () => {
      expect(dateTimePrompt.getValueName(stateWith('2026-11-17 13:05'))).toBe(
        'Nov 17, 2026 01:05 PM',
      );
    });

    it('shows an impossible stored date as invalid, without rolling it over', () => {
      // The host application's Day.js setup spells it 'Invalid date' (Moment's text).
      expect(datePrompt.getValueName(stateWith('2026-02-30'))).toMatch(
        /^Invalid [Dd]ate$/,
      );
    });

    it('shows nothing when no value is stored', () => {
      expect(datePrompt.getValueName(stateWith(''))).toBe('');
      expect(dateTimePrompt.getValueName(stateWith(undefined))).toBe('');
    });
  });

  describe('getModelValue', () => {
    it('splits a stored Date into the date picker model', () => {
      expect(datePrompt.getModelValue(stateWith('2026-11-17'))).toEqual({
        month: 11,
        day: 17,
        year: 2026,
      });
    });

    it('splits a stored DateTime into date and time models', () => {
      expect(
        dateTimePrompt.getModelValue(stateWith('2026-11-17 09:05')),
      ).toEqual({
        date: {month: 11, day: 17, year: 2026},
        time: {hour: 9, minute: 5},
      });
    });
  });
});
