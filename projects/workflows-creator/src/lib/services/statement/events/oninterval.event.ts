import {LocalizedStringKeys, StartElementTypes} from '../../../enum';
import {RecordOfAnyType} from '../../../types';
import {BpmnEvent} from '../../../types/bpmn.types';
import {TriggerOnInterval} from '../../bpmn/elements/tasks/trigger-on-interval.task';
import {TimeIntervalInput, ToIntervalInput} from '../inputs';
import {IntervalInput} from '../inputs/interval.input';
import {StepperInput} from '../inputs/stepper.input';

export class OnIntervalEvent extends BpmnEvent {
  groupType: string;
  groupId: string;
  trigger = true;
  startElement = StartElementTypes.StartOnIntervalElement;
  elements = [TriggerOnInterval.identifier];
  name = 'On Interval';
  statement = 'Every ';
  properties = {};
  prompts = [
    StepperInput.identifier,
    IntervalInput.identifier,
    ToIntervalInput.identifier,
    TimeIntervalInput.identifier,
  ];
  static identifier = 'OnIntervalEvent';
  constructor(
    localizedStringMap: RecordOfAnyType,
    id: string,
    groupType: string,
    groupId: string,
  ) {
    super();
    this.id = id;
    this.groupType = groupType;
    this.groupId = groupId;
    this.name =
      localizedStringMap[LocalizedStringKeys.OnInterval] ?? 'On Interval';
  }

  getIdentifier(): string {
    return OnIntervalEvent.identifier;
  }
}
