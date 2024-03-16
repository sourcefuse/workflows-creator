import {NodeTypes} from '../../enum';
import {WorkflowAction} from './abstract-workflow-action.class';
import {AbstractWorkflowNode} from './abstract-workflow-node.class';

describe('WorkflowAction', () => {
  let workflowAction: WorkflowAction<any>;

  beforeEach(() => {
    class MockAbstractWorkflowNode extends AbstractWorkflowNode<any> {
      type = NodeTypes.ACTION;
      statement: string;
      prompts: string[];
      state: any;
      name: string;
      groupType: string;
      groupId: string;
      elements: any[];
      isElseAction: boolean;
      getIdentifier(): string {
        return `${this.groupId}_${this.name}`;
      }
    }

    workflowAction = new MockAbstractWorkflowNode();
  });

  it('should have type set to NodeTypes.ACTION', () => {
    expect(workflowAction.type).toEqual(NodeTypes.ACTION);
  });
});
