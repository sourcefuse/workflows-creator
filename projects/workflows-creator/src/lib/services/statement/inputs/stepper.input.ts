import {State, WorkflowPrompt} from '../../../classes';
import {InputTypes} from '../../../enum';
import {RecordOfAnyType} from '../../../types';

export class StepperInput extends WorkflowPrompt {
  prefix = '';
  suffix = '';
  typeFunction = () => InputTypes.Stepper;
  inputKey = 'value';
  listNameField = 'text';
  listValueField = 'value';
  placeholder = 'n';
  customPlaceholder: string | {state: string} = {state: 'stepperPlaceholder'};
  options = <S extends RecordOfAnyType>(state: State<S>) =>
    state.get('stepperCount') as [];
  static identifier = 'StepperInput';

  getIdentifier(): string {
    return StepperInput.identifier;
  }
}
