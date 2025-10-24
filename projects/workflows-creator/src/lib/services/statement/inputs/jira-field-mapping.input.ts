import {ValueInput} from './value.input';

export class JiraFieldMappingInput extends ValueInput {
  prefix = 'and map ';
  placeholder = 'these fields';
  suffix = ' for the item and Jira issue.';
  static identifier = 'JiraFieldMappingInput';
  isLink = true;
  nextLine = true;

  getIdentifier(): string {
    return JiraFieldMappingInput.identifier;
  }
}
