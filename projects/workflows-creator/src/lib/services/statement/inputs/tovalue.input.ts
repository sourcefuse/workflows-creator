import {ValueInput} from './value.input';

export class ToValueInput extends ValueInput {
  prefix = '';
  static identifier = 'ToValueInput';

  getIdentifier(): string {
    return ToValueInput.identifier;
  }
}
