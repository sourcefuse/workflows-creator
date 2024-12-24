import {State, WorkflowPrompt} from '../../../classes';
import {InputTypes, IntervalType} from '../../../enum';
import {BpmnNode, RecordOfAnyType} from '../../../types';

export class ToIntervalInput extends WorkflowPrompt {
  prefix = '';
  suffix = '';
  typeFunction = <S extends RecordOfAnyType>(state: State<S>) =>
    state.get('valueInputTypes') as InputTypes;
  inputKey = 'toInterval';
  listNameField = 'text';
  listValueField = 'value';
  placeholder = 'weekday';
  customPlaceholder: string | {state: string} = {state: 'dateStatePlaceholder'};
  isHidden = (node: BpmnNode) => {
    return ![
      IntervalType.Weeks,
      IntervalType.Months,
      IntervalType.Week,
      IntervalType.Month,
    ].includes(node.state.get('intervalType'));
  };
  options = <S extends RecordOfAnyType>(state: State<S>) =>
    state.get('intervalOption');
  static identifier = 'ToIntervalInput';

  getIdentifier(): string {
    return ToIntervalInput.identifier;
  }
}
