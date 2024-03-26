import {EmailDataInput, EmailToInput, EmailRecepientInput} from './email.input';

describe('EmailDataInput', () => {
  let emailDataInput: EmailDataInput;

  beforeEach(() => {
    emailDataInput = new EmailDataInput();
  });

  it('should have prefix property', () => {
    expect(emailDataInput.prefix).toBeDefined();
  });

  it('should have suffix property', () => {
    expect(emailDataInput.suffix).toBeDefined();
  });

  it('should have typeFunction property', () => {
    expect(emailDataInput.typeFunction).toBeDefined();
  });

  it('should have inputKey property', () => {
    expect(emailDataInput.inputKey).toBeDefined();
  });

  it('should have placeholder property', () => {
    expect(emailDataInput.placeholder).toBeDefined();
  });

  it('should have identifier property', () => {
    expect(EmailDataInput.identifier).toBeDefined();
  });

  it('should have getIdentifier method', () => {
    expect(emailDataInput.getIdentifier).toBeDefined();
  });
});

describe('EmailToInput', () => {
  let emailToInput: EmailToInput;

  beforeEach(() => {
    emailToInput = new EmailToInput();
  });

  it('should have prefix property', () => {
    expect(emailToInput.prefix).toBeDefined();
  });

  it('should have suffix property', () => {
    expect(emailToInput.suffix).toBeDefined();
  });

  it('should have placeholder property', () => {
    expect(emailToInput.placeholder).toBeDefined();
  });

  it('should have inputKey property', () => {
    expect(emailToInput.inputKey).toBeDefined();
  });

  it('should have listNameField property', () => {
    expect(emailToInput.listNameField).toBeDefined();
  });

  it('should have listValueField property', () => {
    expect(emailToInput.listValueField).toBeDefined();
  });

  it('should have prevchange method', () => {
    expect(emailToInput.prevchange).toBeDefined();
  });

  it('should have options method', () => {
    expect(emailToInput.options).toBeDefined();
  });

  it('should have typeFunction method', () => {
    expect(emailToInput.typeFunction).toBeDefined();
  });

  it('should have identifier property', () => {
    expect(EmailToInput.identifier).toBeDefined();
  });

  it('should have getIdentifier method', () => {
    expect(emailToInput.getIdentifier).toBeDefined();
  });
});

describe('EmailRecepientInput', () => {
  let emailRecepientInput: EmailRecepientInput;

  beforeEach(() => {
    emailRecepientInput = new EmailRecepientInput();
  });

  it('should have inputKey property', () => {
    expect(emailRecepientInput.inputKey).toBeDefined();
  });

  it('should have placeholder property', () => {
    expect(emailRecepientInput.placeholder).toBeDefined();
  });

  it('should have isHidden method', () => {
    expect(emailRecepientInput.isHidden).toBeDefined();
  });

  it('should have identifier property', () => {
    expect(EmailRecepientInput.identifier).toBeDefined();
  });

  it('should have getIdentifier method', () => {
    expect(emailRecepientInput.getIdentifier).toBeDefined();
  });
});
