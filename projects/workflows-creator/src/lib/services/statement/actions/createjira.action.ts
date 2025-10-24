import {CreateJiraIssue} from '../../bpmn/elements/tasks/create-jira-issue.task';
import {BpmnAction} from '../../../types/bpmn.types';
import {LocalizedStringKeys} from '../../../enum';
import {RecordOfAnyType} from '../../../types';
import {
  JiraAccountConnectInput,
  JiraProjectSelectInput,
  JiraIssueTypeSelectInput,
  JiraFieldMappingInput,
} from '..';

export class CreateJiraIssueAction extends BpmnAction {
  isElseAction: boolean;
  groupType: string;
  groupId: string;
  elements = [CreateJiraIssue.identifier];
  name = 'Create a Jira issue';
  statement = '';
  noMultiLine = 4;
  prompts = [
    JiraAccountConnectInput.identifier,
    JiraProjectSelectInput.identifier,
    JiraIssueTypeSelectInput.identifier,
    JiraFieldMappingInput.identifier,
  ];
  static identifier = 'CreateJiraIssueAction';
  constructor(
    localizedStringMap: RecordOfAnyType,
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
      localizedStringMap[LocalizedStringKeys.CreateJiraIssue] ??
      'Create a Jira issue';
  }

  getIdentifier(): string {
    return CreateJiraIssueAction.identifier;
  }
}
