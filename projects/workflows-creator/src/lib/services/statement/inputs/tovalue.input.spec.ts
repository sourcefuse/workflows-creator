import {ToValueInput} from './tovalue.input';

describe('ToValueInput', () => {
  let toValueInput: ToValueInput;

  beforeEach(() => {
    toValueInput = new ToValueInput();
  });

  it('should have prefix property set to an empty string', () => {
    expect(toValueInput.prefix).toEqual('');
  });

  it('should have identifier property set to "ToValueInput"', () => {
    expect(ToValueInput.identifier).toEqual('ToValueInput');
  });

  describe('getIdentifier', () => {
    it('should return the identifier property', () => {
      expect(toValueInput.getIdentifier()).toEqual(ToValueInput.identifier);
    });
  });
});
