import {LocalizedStringKeys} from '../../../enum';
import {RecordOfAnyType} from '../../../types';
import {OnValueEvent} from './onvalue.event';

describe('OnValueEvent', () => {
  let event: OnValueEvent;
  const localizedStringMap: RecordOfAnyType = {
    [LocalizedStringKeys.CheckValue]: 'Localized Check value',
  };
  let id = '';
  let groupType = '';
  let groupId = '';

  beforeEach(() => {
    event = new OnValueEvent(localizedStringMap, id, groupType, groupId);
  });

  it('should create an instance of OnValueEvent', () => {
    expect(event).toBeDefined();
    expect(event instanceof OnValueEvent).toBeTruthy();
  });

  it('should set the properties correctly', () => {
    expect(event.id).toEqual(id);
    expect(event.groupType).toEqual(groupType);
    expect(event.groupId).toEqual(groupId);
    expect(event.trigger).toEqual(false);
    expect(event.elements).toEqual(['ReadColumnValue', 'GatewayElement']);
    expect(event.name).toEqual('Localized Check value');
    expect(event.statement).toEqual('check if ');
    expect(event.properties).toEqual({});
    expect(event.prompts).toEqual([
      'ColumnInput',
      'ConditionInput',
      'ValueInput',
    ]);
  });

  it('should return the correct identifier', () => {
    expect(event.getIdentifier()).toEqual('OnValueEvent');
  });
});
