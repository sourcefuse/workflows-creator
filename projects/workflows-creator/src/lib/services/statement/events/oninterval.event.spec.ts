import {LocalizedStringKeys, StartElementTypes} from '../../../enum';
import {RecordOfAnyType} from '../../../types';
import {OnIntervalEvent} from './oninterval.event';

describe('OnIntervalEvent', () => {
  let event: OnIntervalEvent;
  const localizedStringMap: RecordOfAnyType = {
    [LocalizedStringKeys.OnInterval]: 'Localized On Interval',
  };
  let id = '';
  let groupType = '';
  let groupId = '';

  beforeEach(() => {
    event = new OnIntervalEvent(localizedStringMap, id, groupType, groupId);
  });

  it('should create an instance of OnIntervalEvent', () => {
    expect(event).toBeDefined();
    expect(event instanceof OnIntervalEvent).toBeTruthy();
  });

  it('should set the properties correctly', () => {
    expect(event.id).toEqual(id);
    expect(event.groupType).toEqual(groupType);
    expect(event.groupId).toEqual(groupId);
    expect(event.trigger).toEqual(true);
    expect(event.startElement).toEqual(
      StartElementTypes.StartOnIntervalElement,
    );
    expect(event.elements).toEqual(['TriggerOnInterval']);
    expect(event.name).toEqual('Localized On Interval');
    expect(event.statement).toEqual('Every ');
    expect(event.properties).toEqual({});
    expect(event.prompts).toEqual(['ValueInput', 'IntervalInput']);
  });

  it('should return the correct identifier', () => {
    expect(event.getIdentifier()).toEqual('OnIntervalEvent');
  });
});
