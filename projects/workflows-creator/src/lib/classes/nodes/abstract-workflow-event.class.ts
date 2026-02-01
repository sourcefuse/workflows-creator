import {NodeTypes} from '../../enum';
import {AbstractWorkflowNode} from './abstract-workflow-node.class';

export abstract class WorkflowEvent<E> extends AbstractWorkflowNode<E> {
  abstract trigger: boolean;
  type = NodeTypes.EVENT;
  startElement: string;
  private static _isEnabled = true;

  isEnabled(): boolean {
    return (this.constructor as typeof WorkflowEvent)._isEnabled;
  }

  static setEnabled(value: boolean): void {
    this._isEnabled = value;
  }
}
