import {StatementNode} from '../classes';
import {WorkflowElement} from '../classes/element/abstract-element.class';
import {LinkStrategy} from './link-strategy.interface';

// Mock class for WorkflowElement
class MockWorkflowElement<T> extends WorkflowElement<T> {
  // Implement any abstract methods with mock implementations
  tag: any;
  attributes: any;
  name: any;
  inputs: any;
  outputs: any;
  creator: any;
  linker: any;
  getIdentifier(): any {
    return '';
  }
}

describe('LinkStrategy', () => {
  let linkStrategy: LinkStrategy<any>;

  beforeEach(() => {
    // Initialize any necessary setup before each test
    linkStrategy = {
      // Mock implementation of the execute method
      execute: (
        element: WorkflowElement<any>,
        node: StatementNode<any>,
      ): any[] => {
        // Mock implementation, return an empty array for now
        return [];
      },
    };
  });

  it('should implement the execute method', () => {
    // Ensure that the execute method is implemented
    expect(linkStrategy.execute).toBeDefined();
  });

  it('execute method should return an empty array', () => {
    // Test the behavior of the execute method
    const mockElement = new MockWorkflowElement<any>(); // Create a mock WorkflowElement
    const mockNode = new StatementNode<any>(mockElement); // Create a mock StatementNode

    // Call the execute method and expect it to return an empty array
    const result = linkStrategy.execute(mockElement, mockNode);
    expect(result).toEqual([]);
  });
});
