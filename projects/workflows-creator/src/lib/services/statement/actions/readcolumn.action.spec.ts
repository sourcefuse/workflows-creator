import {RecordOfAnyType} from '../../../types';
import {ReadColumnValueAction} from './readcolumn.action';

describe('ReadColumnValueAction', () => {
  let action: ReadColumnValueAction;
  let localizedStringMap: RecordOfAnyType = {}; // You can provide sample data for localizedStringMap
  let id = '';
  let groupType = '';
  let groupId = '';
  let isElseAction = false;

  beforeEach(() => {
    action = new ReadColumnValueAction(
      localizedStringMap,
      id,
      groupType,
      groupId,
      isElseAction,
    );
  });

  it('should create an instance of ReadColumnValueAction', () => {
    expect(action).toBeDefined();
    expect(action instanceof ReadColumnValueAction).toBeTruthy();
  });

  it('should set the properties correctly', () => {
    expect(action.id).toEqual(id);
    expect(action.groupType).toEqual(groupType);
    expect(action.groupId).toEqual(groupId);
    expect(action.isElseAction).toEqual(isElseAction);
    expect(action.elements).toEqual([]);
    expect(action.name).toEqual('Read Column Value');
    expect(action.statement).toEqual('read value from ');
    expect(action.prompts).toEqual([]);
  });

  it('should return the correct identifier', () => {
    expect(action.getIdentifier()).toEqual('ReadColumnValueAction');
  });
});
