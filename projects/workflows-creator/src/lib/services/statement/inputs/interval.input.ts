import {State, WorkflowPrompt} from '../../../classes';
import {InputTypes} from '../../../enum';
import {RecordOfAnyType} from '../../../types';

export class IntervalInput extends WorkflowPrompt {
  override prefix = '';
  override suffix = '';
  override typeFunction = () => InputTypes.List;
  override inputKey = 'interval';
  listNameField = 'text';
  listValueField = 'value';
  override placeholder = 'Interval';
  options = <S extends RecordOfAnyType>(state: State<S>) =>
    state.get('intervalList');
  static identifier = 'IntervalInput';

  override getIdentifier(): string {
    return IntervalInput.identifier;
  }
}
