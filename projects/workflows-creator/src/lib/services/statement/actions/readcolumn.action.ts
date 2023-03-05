import {BpmnAction} from '../../../types/bpmn.types';

export class ReadColumnValueAction extends BpmnAction {
  isElseAction: boolean;
  groupType: string;
  groupId: string;
  elements = [];
  name = 'Read Column Value';
  statement = 'read value from ';
  prompts = [];
  static identifier = 'ReadColumnValueAction';
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
    return ReadColumnValueAction.identifier;
  }
}
