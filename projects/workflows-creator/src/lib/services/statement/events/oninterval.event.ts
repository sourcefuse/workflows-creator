import {StartElementTypes} from '../../../enum';
import {BpmnEvent} from '../../../types/bpmn.types';
import {TriggerOnInterval} from '../../bpmn/elements/tasks/trigger-on-interval.task';
import {IntervalInput} from '../inputs/interval.input';
import {ValueInput} from '../inputs/value.input';

export class OnIntervalEvent extends BpmnEvent {
  groupType: string;
  groupId: string;
  trigger = true;
  startElement = StartElementTypes.StartOnIntervalElement;
  elements = [TriggerOnInterval.identifier];
  name = 'On Interval';
  statement = 'Every ';
  properties = {};
  prompts = [ValueInput.identifier, IntervalInput.identifier];
  static identifier = 'OnIntervalEvent';
  constructor(id: string, groupType: string, groupId: string) {
    super();
    this.id = id;
    this.groupType = groupType;
    this.groupId = groupId;
  }

  getIdentifier(): string {
    return OnIntervalEvent.identifier;
  }
}
