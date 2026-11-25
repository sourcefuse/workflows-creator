import {ValueInput} from './value.input';

export class ToValueInput extends ValueInput {
  override prefix = '';
  static identifier = 'ToValueInput';

  override getIdentifier(): string {
    return ToValueInput.identifier;
  }
}
