import {DateStruct} from './date-struct.interface';

describe('DateStruct', () => {
  let dateStruct: DateStruct;

  beforeEach(() => {
    dateStruct = {
      year: 2021,
      month: 10,
      day: 15,
    };
  });

  it('should have a year property', () => {
    expect(dateStruct.year).toBeDefined();
    expect(typeof dateStruct.year).toBe('number');
  });

  it('should have a month property', () => {
    expect(dateStruct.month).toBeDefined();
    expect(typeof dateStruct.month).toBe('number');
  });

  it('should have a day property', () => {
    expect(dateStruct.day).toBeDefined();
    expect(typeof dateStruct.day).toBe('number');
  });
});
