import {ConditionInput} from './condition.input';

describe('ConditionInput', () => {
  let conditionInput: ConditionInput;

  beforeEach(() => {
    conditionInput = new ConditionInput();
  });

  it('should have prefix property', () => {
    expect(conditionInput.prefix).toBeDefined();
  });

  it('should have suffix property', () => {
    expect(conditionInput.suffix).toBeDefined();
  });

  it('should have typeFunction property', () => {
    expect(conditionInput.typeFunction).toBeDefined();
  });

  it('should have inputKey property', () => {
    expect(conditionInput.inputKey).toBeDefined();
  });

  it('should have listNameField property', () => {
    expect(conditionInput.listNameField).toBeDefined();
  });

  it('should have listValueField property', () => {
    expect(conditionInput.listValueField).toBeDefined();
  });

  it('should have placeholder property', () => {
    expect(conditionInput.placeholder).toBeDefined();
  });

  it('should have prevchange method', () => {
    expect(conditionInput.prevchange).toBeDefined();
  });

  it('should have options method', () => {
    expect(conditionInput.options).toBeDefined();
  });

  it('should have identifier property', () => {
    expect(ConditionInput.identifier).toBeDefined();
  });

  it('should have getIdentifier method', () => {
    expect(conditionInput.getIdentifier).toBeDefined();
  });

  describe('getIdentifier', () => {
    it('should return the identifier', () => {
      expect(conditionInput.getIdentifier()).toBe(ConditionInput.identifier);
    });
  });
});
