import {LocalizedStringKeys, StartElementTypes} from '../../../enum';
import {BpmnEvent} from '../../../types/bpmn.types';
import {GatewayElement} from '../../bpmn/elements/gateways/gateway.element';
import {ReadColumnValue} from '../../bpmn/elements/tasks/read-column.task';
import {TriggerWhenColumnChanges} from '../../bpmn/elements/tasks/trigger-when-column-changes.task';
import {TriggerColumnInput} from '../inputs';
import {ValueInput} from '../inputs/value.input';

export class OnChangeEvent extends BpmnEvent {
  groupType: string;
  groupId: string;
  trigger = true;
  startElement = StartElementTypes.BasicStartElement;
  elements = [
    TriggerWhenColumnChanges.identifier,
    ReadColumnValue.identifier,
    GatewayElement.identifier,
  ];
  name = 'Column changes';
  statement = 'When ';
  properties = {};
  prompts = [TriggerColumnInput.identifier, ValueInput.identifier];
  static identifier = 'OnChangeEvent';
  constructor(
    localizedStringMap: {[key: string]: string},
    id: string,
    groupType: string,
    groupId: string,
  ) {
    super();
    this.id = id;
    this.groupType = groupType;
    this.groupId = groupId;
    this.name =
      localizedStringMap[LocalizedStringKeys.ColumnChanges] ?? 'Column changes';
  }

  getIdentifier(): string {
    return OnChangeEvent.identifier;
  }
}
