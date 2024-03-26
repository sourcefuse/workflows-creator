import {TriggerColumnInput} from './triggercolumn.input';

describe('TriggerColumnInput', () => {
  let triggerColumnInput: TriggerColumnInput;

  beforeEach(() => {
    triggerColumnInput = new TriggerColumnInput();
  });

  it('should have a suffix property', () => {
    expect(triggerColumnInput.suffix).toBeDefined();
  });

  it('should have a static identifier property', () => {
    expect(TriggerColumnInput.identifier).toBeDefined();
  });

  it('should have a getIdentifier method', () => {
    expect(triggerColumnInput.getIdentifier).toBeDefined();
  });

  describe('getIdentifier', () => {
    it('should return the identifier', () => {
      const identifier = triggerColumnInput.getIdentifier();
      expect(identifier).toEqual(TriggerColumnInput.identifier);
    });
  });
});
