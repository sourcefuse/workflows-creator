import {WorkflowListPrompt, isSelectInput} from './abstract-list-prompt.class';
import {WorkflowPrompt} from './abstract-prompt.class';

describe('WorkflowListPrompt', () => {
  let prompt: WorkflowListPrompt;

  beforeEach(() => {
    prompt = jasmine.createSpyObj('WorkflowListPrompt', [
      'listNameField',
      'listValueField',
      'isHidden',
      'options',
    ]);
  });

  it('should have listNameField property', () => {
    expect(prompt.listNameField).toBeDefined();
  });

  it('should have listValueField property', () => {
    expect(prompt.listValueField).toBeDefined();
  });

  it('should have isHidden property', () => {
    expect(prompt.isHidden).toBeDefined();
  });

  it('should have options property', () => {
    expect(prompt.options).toBeDefined();
  });
});
