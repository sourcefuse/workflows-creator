import {State, WorkflowPrompt} from '../../../classes';
import {InputTypes} from '../../../enum';
import {RecordOfAnyType} from '../../../types';

export class ColumnInput extends WorkflowPrompt {
  override prefix = '';
  override suffix = '';
  override typeFunction = () => InputTypes.List;
  override inputKey = 'column';
  listNameField = 'text';
  listValueField = 'value';
  override placeholder = 'Column';
  options = <S extends RecordOfAnyType>(state: State<S>) =>
    state.get('columns');
  static identifier = 'ColumnInput';

  override getIdentifier(): string {
    return ColumnInput.identifier;
  }
}
