import {WorkflowPrompt} from '../classes/nodes/abstract-prompt.class';
import {WorkflowAction} from '../classes/nodes/abstract-workflow-action.class';
import {WorkflowEvent} from '../classes/nodes/abstract-workflow-event.class';
import {WorkflowNode} from './base.types';
import {
  ActionAddition,
  AllowedValues,
  ChangeEvent,
  EventAddition,
  InputChanged,
  isChangeEvent,
} from '.';

describe('YourFile Tests', () => {
  let event: ChangeEvent;
  let workflowEvent: WorkflowEvent<any>;
  let workflowAction: WorkflowAction<any>;
  let node: WorkflowNode<any>;
  let prompt: WorkflowPrompt;
  let value: AllowedValues;

  beforeEach(() => {
    event = {
      target: {
        value: 'example',
      },
    };
    value = {};
  });

  it('isChangeEvent should return true for a ChangeEvent', () => {
    expect(isChangeEvent(event)).toBe(true);
  });

  it('isChangeEvent should return false for undefined', () => {
    expect(isChangeEvent(undefined)).toBe(false);
  });

  it('EventAddition should create an EventAddition object', () => {
    const addition: EventAddition<any> = {
      name: 'example',
      event: workflowEvent,
    };
    expect(addition.name).toBe('example');
    expect(addition.event).toBe(workflowEvent);
  });

  it('ActionAddition should create an ActionAddition object', () => {
    const addition: ActionAddition<any> = {
      name: 'example',
      action: workflowAction,
    };
    expect(addition.name).toBe('example');
    expect(addition.action).toBe(workflowAction);
  });

  it('InputChanged should create an InputChanged object', () => {
    const inputChanged: InputChanged<any> = {
      item: node,
      field: 'exampleField',
      value: value,
    };
    expect(inputChanged.item).toBe(node);
    expect(inputChanged.field).toBe('exampleField');
    expect(inputChanged.value).toBe(value);
  });
});
