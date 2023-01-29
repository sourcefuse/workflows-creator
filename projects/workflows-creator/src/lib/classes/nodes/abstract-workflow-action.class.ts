import {NodeTypes} from '../../enum';
import {AbstractWorkflowNode} from './abstract-workflow-node.class';

export abstract class WorkflowAction<E> extends AbstractWorkflowNode<E> {
  abstract isElseAction: boolean;
  type = NodeTypes.ACTION;
}
