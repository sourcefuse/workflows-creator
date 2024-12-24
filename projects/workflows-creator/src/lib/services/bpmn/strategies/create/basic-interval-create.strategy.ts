import {Injectable} from '@angular/core';
import {UtilsService} from '../../../utils.service';
import {CreateStrategy} from '../../../../interfaces';
import {
  BpmnStatementNode,
  CustomBpmnModdle,
  ModdleElement,
  RecordOfAnyType,
} from '../../../../types';
import {State, WorkflowElement} from '../../../../classes';

enum WeekDaysEnum {
  sunday = 1,
  monday = 2,
  tuesday = 3,
  wednesday = 4,
  thursday = 5,
  friday = 6,
  saturday = 7,
}

@Injectable()
export class CreateBasicIntervalStrategy
  implements CreateStrategy<ModdleElement>
{
  constructor(
    private readonly moddle: CustomBpmnModdle,
    private readonly utils: UtilsService,
  ) {}
  /**
   * It creates a new BPMN element, assigns it an ID, and returns it
   * @param element - WorkflowElement<ModdleElement>
   * @param {BpmnStatementNode} node - BpmnStatementNode
   * @param {RecordOfAnyType} attrs - RecordOfAnyType
   * @returns A ModdleElement
   */
  execute(
    element: WorkflowElement<ModdleElement>,
    node: BpmnStatementNode,
    attrs: RecordOfAnyType,
  ): ModdleElement {
    element.id = `${element.getIdentifier()}_${this.utils.uuid()}`;

    const timerEventDefinition = this.moddle.create(
      'bpmn:TimerEventDefinition',
    );
    const workflowNode = node.next[0].workflowNode;
    const state = workflowNode.state;
    const timeCycle = this.moddle.create('bpmn:FormalExpression', {
      'xsi:type': 'bpmn:tFormalExpression',
      body: this.intervalBodyPrepare(state),
    });

    timerEventDefinition['timeCycle'] = timeCycle;

    return this.moddle.create(element.tag, {
      id: element.id,
      name: element.name,
      ...this.parseAttributes(attrs, node),
      eventDefinitions: [timerEventDefinition],
    });
  }

  private intervalBodyPrepare(state: State<RecordOfAnyType>) {
    if (
      state.get('interval') === 'M' &&
      state.get('toInterval') &&
      state.get('TimeInterval')
    ) {
      const val =
        state.get('value') === 1
          ? '*'
          : `${state.get('toInterval').month}/${state.get('value')}`;
      return `0 ${state.get('TimeInterval').min} ${
        state.get('TimeInterval').hour
      } ${state.get('toInterval').date} ${val} ?`;
    } else if (
      state.get('interval') === 'W' &&
      state.get('toInterval') &&
      state.get('TimeInterval')
    ) {
      const val = state.get('value') === 1 ? '' : `/${state.get('value')}`;
      let weekDays = state
        .get('toInterval')
        ?.ids?.map(
          (day: string) => WeekDaysEnum[day as keyof typeof WeekDaysEnum],
        )
        .join(',');
      return `0 ${state.get('TimeInterval').min} ${
        state.get('TimeInterval').hour
      } ? * ${weekDays}${val}`;
    } else if (state.get('interval') === 'D' && state.get('TimeInterval')) {
      const today = new Date();
      today.setHours(state.get('TimeInterval').hour);
      today.setMinutes(state.get('TimeInterval').min);
      let isoString = '';
      if (today.getTime() < new Date().getTime()) {
        today.setDate(today.getDate() + 1);
      }
      isoString = today.toISOString();
      return `R/${isoString}/P${state.get('value')}${state.get('interval')}`;
    } else {
      return '0 0 0 ? * *';
    }
  }

  /**
   * It takes an object of attributes and a node, and returns the same object of attributes, but with
   * any attribute that is a state reference replaced with the value of that state
   * @param {RecordOfAnyType} attrs - RecordOfAnyType - this is the attributes object that is passed to
   * the node.
   * @param {BpmnStatementNode} node - The current node being processed
   * @returns The attributes of the node.
   */
  private parseAttributes(attrs: RecordOfAnyType, node: BpmnStatementNode) {
    Object.keys(attrs).forEach(key => {
      if (
        typeof attrs[key] !== 'string' &&
        Object.keys(attrs[key])[0] === 'state'
      ) {
        attrs[key] = node.workflowNode.state.get(attrs[key].state);
      }
    });
    return attrs;
  }
}
