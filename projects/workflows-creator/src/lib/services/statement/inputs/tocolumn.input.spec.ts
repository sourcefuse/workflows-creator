import {ToColumnInput} from './tocolumn.input';

describe('ToColumnInput', () => {
  let toColumnInput: ToColumnInput;

  beforeEach(() => {
    toColumnInput = new ToColumnInput();
  });

  it('should have a suffix property', () => {
    expect(toColumnInput.suffix).toBeDefined();
  });

  it('should have a static identifier property', () => {
    expect(ToColumnInput.identifier).toBeDefined();
  });

  it('should have a getIdentifier method', () => {
    expect(toColumnInput.getIdentifier).toBeDefined();
  });

  describe('getIdentifier', () => {
    it('should return the identifier', () => {
      expect(toColumnInput.getIdentifier()).toEqual(ToColumnInput.identifier);
    });
  });
});
