import {NodeTypes} from '../../enum';
import {AbstractWorkflowNode} from './abstract-workflow-node.class';

export abstract class WorkflowAction<E> extends AbstractWorkflowNode<E> {
  abstract isElseAction: boolean;
  type = NodeTypes.ACTION;

  private static _isEnabled = true;

  isEnabled(): boolean {
    return (this.constructor as typeof WorkflowAction)._isEnabled;
  }

  static setEnabled(value: boolean): void {
    this._isEnabled = value;
  }
}
