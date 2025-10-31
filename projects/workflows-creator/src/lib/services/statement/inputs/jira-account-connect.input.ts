import {InputTypes} from '../../../enum';
import {ValueInput} from './value.input';

export class JiraAccountConnectInput extends ValueInput {
  static identifier = 'JiraAccountConnectInput';
  prefix = 'connect your ';
  placeholder = 'Jira account';
  suffix = ' to';
  isLink = true;
  typeFunction = () => InputTypes.JiraAccountConnectInput;

  getIdentifier(): string {
    return JiraAccountConnectInput.identifier;
  }
}
