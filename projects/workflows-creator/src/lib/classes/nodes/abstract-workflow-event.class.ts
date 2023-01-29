import {NodeTypes, StartElementTypes} from '../../enum';
import {AbstractWorkflowNode} from './abstract-workflow-node.class';

export abstract class WorkflowEvent<E> extends AbstractWorkflowNode<E> {
  abstract trigger: boolean;
  type = NodeTypes.EVENT;
  startElement = StartElementTypes.BasicStartElement;
}
