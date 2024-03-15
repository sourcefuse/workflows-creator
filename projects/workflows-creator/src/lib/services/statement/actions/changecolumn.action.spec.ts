import {ChangeColumnValueAction} from './changecolumn.action';

describe('ChangeColumnValueAction', () => {
  let changeColumnValueAction: ChangeColumnValueAction;

  beforeEach(() => {
    changeColumnValueAction = new ChangeColumnValueAction(
      {},
      'testId',
      'testGroupType',
      'testGroupId',
      false,
    );
  });

  it('should create an instance of ChangeColumnValueAction', () => {
    expect(changeColumnValueAction).toBeTruthy();
  });

  it('should have the correct identifier', () => {
    expect(changeColumnValueAction.getIdentifier()).toEqual(
      'ChangeColumnValueAction',
    );
  });

  it('should have the correct name', () => {
    expect(changeColumnValueAction.name).toEqual('Change column value');
  });

  it('should have the correct groupType', () => {
    expect(changeColumnValueAction.groupType).toEqual('testGroupType');
  });

  it('should have the correct groupId', () => {
    expect(changeColumnValueAction.groupId).toEqual('testGroupId');
  });

  it('should have the correct isElseAction value', () => {
    expect(changeColumnValueAction.isElseAction).toEqual(false);
  });
});
