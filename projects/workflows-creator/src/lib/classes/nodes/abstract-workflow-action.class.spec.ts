import {NodeTypes} from '../../enum';
import {WorkflowAction} from './abstract-workflow-action.class';
import {AbstractWorkflowNode} from './abstract-workflow-node.class';

describe('WorkflowAction', () => {
  let workflowAction: WorkflowAction<any>; // You may replace 'any' with a specific type for your test

  beforeEach(() => {
    class MockAbstractWorkflowNode extends AbstractWorkflowNode<any> {
      type = NodeTypes.ACTION;
      statement: string;
      prompts: string[];
      state: any; // Replace 'any' with your specific state type
      name: string;
      groupType: string; // Add groupType property
      groupId: string; // Add groupId property
      elements: any[];
      isElseAction: boolean;
      getIdentifier(): string {
        // Implement the getIdentifier method as needed
        return `${this.groupId}_${this.name}`;
      }
      // Mock other necessary methods or properties of AbstractWorkflowNode
    }

    workflowAction = new MockAbstractWorkflowNode(); // You need to implement MockWorkflowAction class
  });

  it('should have type set to NodeTypes.ACTION', () => {
    expect(workflowAction.type).toEqual(NodeTypes.ACTION);
  });
});
