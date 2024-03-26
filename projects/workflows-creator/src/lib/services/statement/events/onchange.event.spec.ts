import {LocalizedStringKeys, StartElementTypes} from '../../../enum';
import {RecordOfAnyType} from '../../../types';
import {OnChangeEvent} from './onchange.event';

describe('OnChangeEvent', () => {
  let event: OnChangeEvent;
  const localizedStringMap: RecordOfAnyType = {
    [LocalizedStringKeys.ColumnChanges]: 'Localized Column changes',
  };
  let id = '';
  let groupType = '';
  let groupId = '';

  beforeEach(() => {
    event = new OnChangeEvent(localizedStringMap, id, groupType, groupId);
  });

  it('should create an instance of OnChangeEvent', () => {
    expect(event).toBeDefined();
    expect(event instanceof OnChangeEvent).toBeTruthy();
  });

  it('should set the properties correctly', () => {
    expect(event.id).toEqual(id);
    expect(event.groupType).toEqual(groupType);
    expect(event.groupId).toEqual(groupId);
    expect(event.trigger).toEqual(true);
    expect(event.startElement).toEqual(StartElementTypes.BasicStartElement);
    expect(event.elements).toEqual([
      'TriggerWhenColumnChanges',
      'ReadColumnValue',
      'GatewayElement',
    ]);
    expect(event.name).toEqual('Localized Column changes');
    expect(event.statement).toEqual('When ');
    expect(event.properties).toEqual({});
    expect(event.prompts).toEqual([
      'TriggerColumnInput',
      'ValueTypeInput',
      'ValueInput',
    ]);
  });

  it('should return the correct identifier', () => {
    expect(event.getIdentifier()).toEqual('OnChangeEvent');
  });
});
