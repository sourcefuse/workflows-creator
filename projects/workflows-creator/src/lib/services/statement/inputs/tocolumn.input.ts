import {ColumnInput} from './column.input';

export class ToColumnInput extends ColumnInput {
  suffix = 'to';
  static identifier = 'ToColumnInput';

  getIdentifier(): string {
    return ToColumnInput.identifier;
  }
}
