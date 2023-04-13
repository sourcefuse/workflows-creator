import {BpmnNode} from '../../types';
import {State} from '../state/state.class';
import {WorkflowPrompt} from './abstract-prompt.class';

export abstract class WorkflowListPrompt extends WorkflowPrompt {
  abstract listNameField: string;
  abstract listValueField: string;
  abstract isHidden?: (node: BpmnNode) => boolean;
  abstract options: <R, S>(state: State<S>) => R[];
}

export function isSelectInput(
  input: WorkflowPrompt,
): input is WorkflowListPrompt {
  return !!(input as WorkflowListPrompt).listNameField;
}
