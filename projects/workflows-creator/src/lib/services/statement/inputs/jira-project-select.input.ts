import {ValueInput} from './value.input';

export class JiraProjectSelectInput extends ValueInput {
  static identifier = 'JiraProjectSelectInput';
  prefix = 'create an issue in ';
  placeholder = 'this project';
  isLink = true;
  nextLine = true;

  getIdentifier(): string {
    return JiraProjectSelectInput.identifier;
  }
}
