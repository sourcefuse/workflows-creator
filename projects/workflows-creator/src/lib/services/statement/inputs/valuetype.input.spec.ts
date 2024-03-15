import {InputTypes} from '../../../enum';
import {ValueTypeInput} from './valuetype.input';

describe('ValueTypeInput', () => {
  let valueTypeInput: ValueTypeInput;

  beforeEach(() => {
    valueTypeInput = new ValueTypeInput();
  });

  it('should have prefix and suffix properties', () => {
    expect(valueTypeInput.prefix).toEqual({state: 'valueTypePrefix'});
    expect(valueTypeInput.suffix).toEqual({state: 'valueTypeSuffix'});
  });

  it('should have typeFunction property that returns InputTypes.List', () => {
    expect(valueTypeInput.typeFunction()).toEqual(InputTypes.List);
  });

  it('should have inputKey property set to "valueType"', () => {
    expect(valueTypeInput.inputKey).toEqual('valueType');
  });

  it('should have listNameField property set to "text"', () => {
    expect(valueTypeInput.listNameField).toEqual('text');
  });

  it('should have listValueField property set to "value"', () => {
    expect(valueTypeInput.listValueField).toEqual('value');
  });

  it('should have placeholder property set to "Something"', () => {
    expect(valueTypeInput.placeholder).toEqual('Something');
  });

  it('should have static identifier property set to "ValueTypeInput"', () => {
    expect(ValueTypeInput.identifier).toEqual('ValueTypeInput');
  });

  describe('getIdentifier', () => {
    it('should return the static identifier property', () => {
      expect(valueTypeInput.getIdentifier()).toEqual(ValueTypeInput.identifier);
    });
  });
});
