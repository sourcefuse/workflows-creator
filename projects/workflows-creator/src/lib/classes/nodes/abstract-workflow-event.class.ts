import {NodeTypes} from '../../enum';
import {AbstractWorkflowNode} from './abstract-workflow-node.class';

export abstract class WorkflowEvent<E> extends AbstractWorkflowNode<E> {
  abstract trigger: boolean;
  type = NodeTypes.EVENT;
  startElement: string;
}
