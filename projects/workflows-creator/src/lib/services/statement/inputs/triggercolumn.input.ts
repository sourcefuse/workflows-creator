import {ColumnInput} from './column.input';

export class TriggerColumnInput extends ColumnInput {
  override suffix = 'changes to';
  static identifier = 'TriggerColumnInput';

  override getIdentifier(): string {
    return TriggerColumnInput.identifier;
  }
}
