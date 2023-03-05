import {ChangeColumnValue} from '../../bpmn/elements/tasks/change-column-value.task';
import {ToColumnInput} from '../inputs/tocolumn.input';
import {ToValueInput} from '../inputs/tovalue.input';
import {BpmnAction} from '../../../types/bpmn.types';

export class ChangeColumnValueAction extends BpmnAction {
  isElseAction: boolean;
  groupType: string;
  groupId: string;
  elements = [ChangeColumnValue.identifier];
  name = 'Change Column Value';
  statement = 'change ';
  prompts = [ToColumnInput.identifier, ToValueInput.identifier];
  static identifier = 'ChangeColumnValueAction';
  constructor(
    id: string,
    groupType: string,
    groupId: string,
    isElseAction: boolean,
  ) {
    super();
    this.id = id;
    this.groupType = groupType;
    this.groupId = groupId;
    this.isElseAction = isElseAction || false;
  }

  getIdentifier(): string {
    return ChangeColumnValueAction.identifier;
  }
}
