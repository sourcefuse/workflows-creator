import {StartElementTypes} from '../../../enum';
import {BpmnEvent} from '../../../types/bpmn.types';
import {TriggerOnAddItem} from '../../bpmn/elements/tasks/trigger-on-add-item.task';

export class OnAddItemEvent extends BpmnEvent {
  groupType: string;
  groupId: string;
  trigger = true;
  startElement = StartElementTypes.BasicStartElement;
  elements = [TriggerOnAddItem.identifier];
  name = 'On add item';
  statement = 'When an item is added';
  properties = {};
  prompts = [];
  static identifier = 'OnAddItemEvent';
  constructor(id: string, groupType: string, groupId: string) {
    super();
    this.id = id;
    this.groupType = groupType;
    this.groupId = groupId;
  }

  getIdentifier(): string {
    return OnAddItemEvent.identifier;
  }
}
