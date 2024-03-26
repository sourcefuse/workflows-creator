import {SendEmailAction} from './sendmail.action';

describe('SendEmailAction', () => {
  let sendEmailAction: SendEmailAction;

  beforeEach(() => {
    sendEmailAction = new SendEmailAction(
      {},
      'testId',
      'testGroupType',
      'testGroupId',
      false,
    );
  });

  it('should create an instance of SendEmailAction', () => {
    expect(sendEmailAction).toBeTruthy();
  });

  it('should have the correct identifier', () => {
    expect(sendEmailAction.getIdentifier()).toEqual('SendEmailAction');
  });

  it('should have the correct name', () => {
    expect(sendEmailAction.name).toEqual('Send an email');
  });

  it('should have the correct statement', () => {
    expect(sendEmailAction.statement).toEqual('send an');
  });

  it('should have the correct isElseAction value', () => {
    expect(sendEmailAction.isElseAction).toBe(false);
  });

  it('should have the correct groupType', () => {
    expect(sendEmailAction.groupType).toEqual('testGroupType');
  });

  it('should have the correct groupId', () => {
    expect(sendEmailAction.groupId).toEqual('testGroupId');
  });
});
