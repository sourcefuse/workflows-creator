import {NodeTypes} from '../../../enum';
import {BpmnEvent} from '../../../types/bpmn.types';
import {GatewayElement} from '../../bpmn/elements/gateways/gateway.element';
import {ReadColumnValue} from '../../bpmn/elements/tasks/read-column.task';
import {ColumnInput} from '../inputs/column.input';
import {ConditionInput} from '../inputs/condition.input';
import {ValueInput} from '../inputs/value.input';

export class OnValueEvent extends BpmnEvent {
  groupType: NodeTypes;
  groupId: string;
  trigger = false;
  elements = [ReadColumnValue, GatewayElement];
  name = 'Check Value ';
  statement = 'check if ';
  properties = {};
  prompts = [ColumnInput, ConditionInput, ValueInput];
  constructor(id: string, groupType: NodeTypes, groupId: string) {
    super();
    this.id = id;
    this.groupType = groupType;
    this.groupId = groupId;
  }
}
