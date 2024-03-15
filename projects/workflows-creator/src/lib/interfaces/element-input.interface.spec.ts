import {State} from '@popperjs/core';
import {
  ParamMap,
  isValueParam,
  isFromParam,
  isStateParam,
  isFormattedParam,
} from './element-input.interface';

describe('isValueParam', () => {
  it('should return true if the param is a ValueParam', () => {
    const param: ParamMap = {value: 'test'};
    expect(isValueParam(param)).toBe(true);
  });

  it('should return false if the param is not a ValueParam', () => {
    const param: ParamMap = {from: 'test'};
    expect(isValueParam(param)).toBe(false);
  });
});

describe('isFromParam', () => {
  it('should return true if the param is a FromParam', () => {
    const param: ParamMap = {from: 'test'};
    expect(isFromParam(param)).toBe(true);
  });

  it('should return false if the param is not a FromParam', () => {
    const param: ParamMap = {value: 'test'};
    expect(isFromParam(param)).toBe(false);
  });
});

describe('isStateParam', () => {
  it('should return true if the param is a StateParam', () => {
    const param: ParamMap = {state: 'test'};
    expect(isStateParam(param)).toBe(true);
  });

  it('should return false if the param is not a StateParam', () => {
    const param: ParamMap = {value: 'test'};
    expect(isStateParam(param)).toBe(false);
  });
});

describe('isFormattedParam', () => {
  it('should return false if the param is not a FormattedParam', () => {
    const param: ParamMap = {value: 'test'};
    expect(isFormattedParam(param)).toBe(false);
  });
});
