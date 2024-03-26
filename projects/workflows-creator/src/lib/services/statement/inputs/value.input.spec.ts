import {ValueInput} from './value.input';

describe('ValueInput', () => {
  let valueInput: ValueInput;

  beforeEach(() => {
    valueInput = new ValueInput();
  });

  it('should have prefix property', () => {
    expect(valueInput.prefix).toBeDefined();
  });

  it('should have suffix property', () => {
    expect(valueInput.suffix).toBeDefined();
  });

  it('should have inputKey property', () => {
    expect(valueInput.inputKey).toBeDefined();
  });

  it('should have listNameField property', () => {
    expect(valueInput.listNameField).toBeDefined();
  });

  it('should have listValueField property', () => {
    expect(valueInput.listValueField).toBeDefined();
  });

  it('should have placeholder property', () => {
    expect(valueInput.placeholder).toBeDefined();
  });

  it('should have customPlaceholder property', () => {
    expect(valueInput.customPlaceholder).toBeDefined();
  });

  it('should have isHidden method', () => {
    expect(valueInput.isHidden).toBeDefined();
  });

  it('should have prevchange method', () => {
    expect(valueInput.prevchange).toBeDefined();
  });

  it('should have options method', () => {
    expect(valueInput.options).toBeDefined();
  });

  it('should have typeFunction method', () => {
    expect(valueInput.typeFunction).toBeDefined();
  });

  it('should have identifier property', () => {
    expect(ValueInput.identifier).toBeDefined();
  });

  it('should have getIdentifier method', () => {
    expect(valueInput.getIdentifier).toBeDefined();
  });
});
