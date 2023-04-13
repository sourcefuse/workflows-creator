import {ColumnInput} from './column.input';

export class TriggerColumnInput extends ColumnInput {
  suffix = 'Changes to';
  static identifier = 'TriggerColumnInput';

  getIdentifier(): string {
    return TriggerColumnInput.identifier;
  }
}
