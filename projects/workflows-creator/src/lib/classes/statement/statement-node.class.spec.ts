import {WorkflowNode} from '../../types/base.types';
import {WorkflowElement} from '../element/abstract-element.class';
import {WorkflowPrompt} from '../nodes';
import {StatementNode} from './statement-node.class';

describe('StatementNode', () => {
  let statementNode: StatementNode<any>;
  let mockElement: WorkflowElement<any>;
  let mockNode: WorkflowNode<any>;

  beforeEach(() => {
    // Create mock instances for WorkflowElement and WorkflowNode
    mockElement = {} as WorkflowElement<any>;
    mockNode = {} as WorkflowNode<any>;

    // Create a new StatementNode instance before each test
    statementNode = new StatementNode(mockElement, mockNode);
  });

  it('should set the tag property correctly', () => {
    statementNode.setTag('someTag');
    expect(statementNode.tag).toBe('someTag');
  });
});
