import {LocalizedStringKeys, StartElementTypes} from '../../../enum';
import {RecordOfAnyType} from '../../../types';
import {OnAddItemEvent} from './onadditem.event';

describe('OnAddItemEvent', () => {
  let event: OnAddItemEvent;
  const localizedStringMap: RecordOfAnyType = {
    [LocalizedStringKeys.OnAddItem]: 'Localized On add item',
    [LocalizedStringKeys.ItemCreated]: 'Localized Item created',
  };
  let id = '';
  let groupType = '';
  let groupId = '';

  beforeEach(() => {
    event = new OnAddItemEvent(localizedStringMap, id, groupType, groupId);
  });

  it('should create an instance of OnAddItemEvent', () => {
    expect(event).toBeDefined();
    expect(event instanceof OnAddItemEvent).toBeTruthy();
  });

  it('should set the properties correctly', () => {
    expect(event.id).toEqual(id);
    expect(event.groupType).toEqual(groupType);
    expect(event.groupId).toEqual(groupId);
    expect(event.trigger).toEqual(true);
    expect(event.startElement).toEqual(StartElementTypes.BasicStartElement);
    expect(event.elements).toEqual(['TriggerOnAddItem']);
    expect(event.name).toEqual('Localized On add item');
    expect(event.statement).toEqual('Localized Item created');
    expect(event.properties).toEqual({});
    expect(event.prompts).toEqual([]);
  });

  it('should return the correct identifier', () => {
    expect(event.getIdentifier()).toEqual('OnAddItemEvent');
  });
});
