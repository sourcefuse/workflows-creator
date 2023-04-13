import {ChangeColumnValue} from '../../bpmn/elements/tasks/change-column-value.task';
import {ToColumnInput} from '../inputs/tocolumn.input';
import {ToValueInput} from '../inputs/tovalue.input';
import {BpmnAction} from '../../../types/bpmn.types';
import {LocalizedStringKeys} from '../../../enum';

export class ChangeColumnValueAction extends BpmnAction {
  isElseAction: boolean;
  groupType: string;
  groupId: string;
  elements = [ChangeColumnValue.identifier];
  name = 'Change column value';
  statement = 'change ';
  prompts = [ToColumnInput.identifier, ToValueInput.identifier];
  static identifier = 'ChangeColumnValueAction';
  constructor(
    localizedStringMap: {[key: string]: string},
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
    this.name =
      localizedStringMap[LocalizedStringKeys.ChangeValue] ??
      'Change column value';
  }

  getIdentifier(): string {
    return ChangeColumnValueAction.identifier;
  }
}
