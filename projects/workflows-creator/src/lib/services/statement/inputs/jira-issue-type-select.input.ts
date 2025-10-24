import {ValueInput} from './value.input';

export class JiraIssueTypeSelectInput extends ValueInput {
  static identifier = 'JiraIssueTypeSelectInput';
  prefix = 'of this ';
  placeholder = 'issue type';
  isLink = true;
  nextLine = true;

  getIdentifier(): string {
    return JiraIssueTypeSelectInput.identifier;
  }
}
