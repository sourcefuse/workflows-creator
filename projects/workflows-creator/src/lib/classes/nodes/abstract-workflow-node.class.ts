import {NodeTypes} from '../../enum';
import {RecordOfAnyType} from '../../types';
import {State} from '../state';

export abstract class AbstractWorkflowNode<E> {
  abstract type: NodeTypes;
  abstract groupType: string;
  abstract groupId: string;
  abstract elements: string[];
  abstract statement: string;
  abstract prompts: string[];
  abstract state: State<RecordOfAnyType>;
  abstract name: string;
  static identifier: string;
  id: string;

  abstract getIdentifier(): string;
}
