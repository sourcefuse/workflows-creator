import {State} from '../../../classes';
import {InputTypes} from '../../../enum';
import {ColumnInput} from './column.input';

describe('ColumnInput', () => {
  let columnInput: ColumnInput;

  beforeEach(() => {
    columnInput = new ColumnInput();
  });

  it('should have prefix and suffix properties', () => {
    expect(columnInput.prefix).toBeDefined();
    expect(columnInput.suffix).toBeDefined();
  });

  it('should have typeFunction property that returns InputTypes.List', () => {
    expect(columnInput.typeFunction()).toBe(InputTypes.List);
  });

  it('should have inputKey property set to "column"', () => {
    expect(columnInput.inputKey).toBe('column');
  });

  it('should have listNameField property set to "text"', () => {
    expect(columnInput.listNameField).toBe('text');
  });

  it('should have listValueField property set to "value"', () => {
    expect(columnInput.listValueField).toBe('value');
  });

  it('should have placeholder property set to "Column"', () => {
    expect(columnInput.placeholder).toBe('Column');
  });

  it('should have identifier property set to "ColumnInput"', () => {
    expect(ColumnInput.identifier).toBe('ColumnInput');
  });

  it('should have getIdentifier method that returns the identifier property', () => {
    expect(columnInput.getIdentifier()).toBe(ColumnInput.identifier);
  });
});
