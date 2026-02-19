import {ColumnInput} from './column.input';

export class ToColumnInput extends ColumnInput {
  override suffix = 'to';
  static identifier = 'ToColumnInput';

  override getIdentifier(): string {
    return ToColumnInput.identifier;
  }
}
