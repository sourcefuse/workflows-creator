import {StartElementTypes} from '../../../enum';
import {BpmnEvent} from '../../../types/bpmn.types';
import {GatewayElement} from '../../bpmn/elements/gateways/gateway.element';
import {ReadColumnValue} from '../../bpmn/elements/tasks/read-column.task';
import {TriggerWhenColumnChanges} from '../../bpmn/elements/tasks/trigger-when-column-changes.task';
import {ColumnInput} from '../inputs/column.input';
import {ConditionInput} from '../inputs/condition.input';
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
  name = 'On Column Value Change';
  statement = 'When ';
  properties = {};
  prompts = [
    ColumnInput.identifier,
    ConditionInput.identifier,
    ValueInput.identifier,
  ];
  static identifier = 'OnChangeEvent';
  constructor(id: string, groupType: string, groupId: string) {
    super();
    this.id = id;
    this.groupType = groupType;
    this.groupId = groupId;
  }

  getIdentifier(): string {
    return OnChangeEvent.identifier;
  }
}
