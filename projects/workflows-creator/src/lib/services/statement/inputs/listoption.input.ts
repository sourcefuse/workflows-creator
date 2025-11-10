import {State, WorkflowPrompt} from '../../../classes';
import {InputTypes} from '../../../enum';
import {RecordOfAnyType} from '../../../types';

export class ListOptionInput extends WorkflowPrompt {
  prefix = '';
  suffix = '';
  typeFunction = () => InputTypes.OptionList;
  inputKey = 'column';
  listNameField = 'text';
  listValueField = 'value';
  placeholder = 'Option';
  customPlaceholder: string | {state: string} = {
    state: 'listOptionPlaceholder',
  };
  options = <S extends RecordOfAnyType>(state: State<S>) =>
    state.get('columns');
  static identifier = 'ListOptionInput';

  getIdentifier(): string {
    return ListOptionInput.identifier;
  }
}
