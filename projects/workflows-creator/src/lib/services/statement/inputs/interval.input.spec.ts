import {InputTypes} from '../../../enum';
import {IntervalInput} from './interval.input';

describe('IntervalInput', () => {
  let intervalInput: IntervalInput;

  beforeEach(() => {
    intervalInput = new IntervalInput();
  });

  it('should have prefix and suffix properties', () => {
    expect(intervalInput.prefix).toBeDefined();
    expect(intervalInput.suffix).toBeDefined();
  });

  it('should have typeFunction property that returns InputTypes.List', () => {
    expect(intervalInput.typeFunction()).toBe(InputTypes.List);
  });

  it('should have inputKey property set to "interval"', () => {
    expect(intervalInput.inputKey).toBe('interval');
  });

  it('should have listNameField property set to "text"', () => {
    expect(intervalInput.listNameField).toBe('text');
  });

  it('should have listValueField property set to "value"', () => {
    expect(intervalInput.listValueField).toBe('value');
  });

  it('should have placeholder property set to "Interval"', () => {
    expect(intervalInput.placeholder).toBe('Interval');
  });

  it('should have identifier property set to "IntervalInput"', () => {
    expect(IntervalInput.identifier).toBe('IntervalInput');
  });

  it('should have getIdentifier method that returns the identifier property', () => {
    expect(intervalInput.getIdentifier()).toBe(IntervalInput.identifier);
  });
});
