import {State, WorkflowPrompt} from '../../../classes';
import {InputTypes} from '../../../enum';
import {RecordOfAnyType} from '../../../types';

export class CriteriaInput extends WorkflowPrompt {
  prefix = '';
  suffix = '';
  typeFunction = () => InputTypes.OptionList;
  inputKey = 'column';
  listNameField = 'text';
  listValueField = 'value';
  placeholder = 'criteria';
  options = <S extends RecordOfAnyType>(state: State<S>) =>
    state.get('columns');
  static identifier = 'CriteriaInput';

  getIdentifier(): string {
    return CriteriaInput.identifier;
  }
}
