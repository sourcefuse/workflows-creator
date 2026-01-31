import {LocalizedStringKeys, StartElementTypes} from '../../../enum';
import {RecordOfAnyType} from '../../../types';
import {BpmnEvent} from '../../../types/bpmn.types';
import {TriggerOnAddItem} from '../../bpmn/elements/tasks/trigger-on-add-item.task';

export class OnAddItemEvent extends BpmnEvent {
  groupType: string;
  groupId: string;
  trigger = true;
  startElement = StartElementTypes.BasicStartElement;
  elements = [TriggerOnAddItem.identifier];
  name = 'On add item';
  statement = 'When an item/subitem is created';
  properties = {};
  prompts = [];
  static identifier = 'OnAddItemEvent';
  constructor(
    localizedStringMap: RecordOfAnyType,
    id: string,
    groupType: string,
    groupId: string,
  ) {
    super();
    this.id = id;
    this.groupType = groupType;
    this.groupId = groupId;
    this.name =
      localizedStringMap[LocalizedStringKeys.OnAddItem] ?? 'On add item';
    this.statement =
      localizedStringMap[LocalizedStringKeys.ItemCreated] ??
      'When an item/subitem is created';
  }

  getIdentifier(): string {
    return OnAddItemEvent.identifier;
  }
}
