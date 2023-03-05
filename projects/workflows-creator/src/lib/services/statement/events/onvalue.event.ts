import {BpmnEvent} from '../../../types/bpmn.types';
import {GatewayElement} from '../../bpmn/elements/gateways/gateway.element';
import {ReadColumnValue} from '../../bpmn/elements/tasks/read-column.task';
import {ColumnInput} from '../inputs/column.input';
import {ConditionInput} from '../inputs/condition.input';
import {ValueInput} from '../inputs/value.input';

export class OnValueEvent extends BpmnEvent {
  groupType: string;
  groupId: string;
  trigger = false;
  elements = [ReadColumnValue.identifier, GatewayElement.identifier];
  name = 'Check Value ';
  statement = 'check if ';
  properties = {};
  prompts = [
    ColumnInput.identifier,
    ConditionInput.identifier,
    ValueInput.identifier,
  ];
  static identifier = 'OnValueEvent';
  constructor(id: string, groupType: string, groupId: string) {
    super();
    this.id = id;
    this.groupType = groupType;
    this.groupId = groupId;
  }

  getIdentifier(): string {
    return OnValueEvent.identifier;
  }
}
