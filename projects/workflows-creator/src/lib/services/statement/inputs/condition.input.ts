import {State, WorkflowPrompt} from '../../../classes';
import {InputTypes} from '../../../enum';
import {RecordOfAnyType} from '../../../types';

export class ConditionInput extends WorkflowPrompt {
  override prefix = '';
  override suffix = {
    state: 'conditionSuffix',
  };
  override typeFunction = () => InputTypes.List;
  override inputKey = 'condition';
  listNameField = 'text';
  listValueField = 'value';
  override placeholder = 'is';
  override prevchange = <S extends RecordOfAnyType>(state: State<S>) => {
    state.remove('conditions');
    state.remove('conditionName');
    state.remove('value');
    state.remove('valueName');
    state.remove('conditionSuffix');
  };
  options = (state: State<RecordOfAnyType>) => state.get('conditions');
  static identifier = 'ConditionInput';

  override getIdentifier(): string {
    return ConditionInput.identifier;
  }
}
