import {State, WorkflowPrompt} from '../../../classes';
import {InputTypes, IntervalType} from '../../../enum';
import {BpmnNode, RecordOfAnyType} from '../../../types';
export class TimeIntervalInput extends WorkflowPrompt {
  prefix: string | {state: string} = {state: 'timeIntervalSuffix'};
  suffix = '';
  typeFunction = () => InputTypes.IntervalTime;
  inputKey = 'TimeInterval';
  listNameField = 'text';
  listValueField = 'value';
  placeholder = 'hh:mm';
  customPlaceholder: string | {state: string} = {state: 'timeStatePlaceholder'};
  isHidden = (node: BpmnNode) => {
    return ![
      IntervalType.Weeks,
      IntervalType.Months,
      IntervalType.Week,
      IntervalType.Month,
      IntervalType.Days,
      IntervalType.Day,
    ].includes(node.state.get('intervalType'));
  };
  options = <S extends RecordOfAnyType>(state: State<S>) =>
    state.get('timevalues');
  static identifier = 'TimeIntervalInput';

  getIdentifier(): string {
    return TimeIntervalInput.identifier;
  }
}
