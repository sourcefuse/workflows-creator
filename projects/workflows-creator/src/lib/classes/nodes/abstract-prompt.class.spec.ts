import {State} from '../state';
import moment from 'moment';
import {InputTypes} from '../../enum';
import {RecordOfAnyType} from '../../types';
import {WorkflowPrompt} from './abstract-prompt.class';

// Mock implementation of WorkflowPrompt for testing purposes
class MockWorkflowPrompt extends WorkflowPrompt {
  getValue(state: State<any>): any {
    throw new Error('Method not implemented.');
  }
  suffix?: string | {state: string};
  prefix?: string | {state: string};
  typeFunction: <S extends RecordOfAnyType>(state: State<S>) => InputTypes;
  inputKey: string;
  placeholder: string;

  // Implement abstract method
  getIdentifier(): string {
    return '';
  }
}

describe('WorkflowPrompt', () => {
  let prompt: MockWorkflowPrompt;
  let state: State<any>;

  beforeEach(() => {
    prompt = new MockWorkflowPrompt();
    state = new State<any>(); // Provide necessary state mock here
  });

  it('should set properties correctly', () => {
    expect(prompt.suffix).toBeUndefined();
    expect(prompt.prefix).toBeUndefined();
    expect(prompt.inputKey).toBeUndefined();
    expect(prompt.placeholder).toBeUndefined();
  });

  it('should format date onDateSelect', () => {
    const mockDate = {year: 2022, month: 5, day: 15};
    const formattedDate = prompt['onDateSelect'](mockDate);
    expect(formattedDate).toBe('15-05-2022');
  });

  it('should format date onDateSelect', () => {
    const mockDate = {year: 2022, month: 5, day: 15};
    const formattedDate = prompt['onDateSelect'](mockDate);
    expect(formattedDate).toBe('15-05-2022');
  });
  it('should set value based on input type', () => {
    // Mock implementation based on different input types
  });
});
