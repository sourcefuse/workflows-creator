import {StatementNode} from '../classes';
import {WorkflowElement} from '../classes/element/abstract-element.class';
import {LinkStrategy} from './link-strategy.interface';

class MockWorkflowElement<T> extends WorkflowElement<T> {
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
    linkStrategy = {
      execute: (
        element: WorkflowElement<any>,
        node: StatementNode<any>,
      ): any[] => {
        return [];
      },
    };
  });

  it('should implement the execute method', () => {
    expect(linkStrategy.execute).toBeDefined();
  });

  it('execute method should return an empty array', () => {
    const mockElement = new MockWorkflowElement<any>();
    const mockNode = new StatementNode<any>(mockElement);

    const result = linkStrategy.execute(mockElement, mockNode);
    expect(result).toEqual([]);
  });
});
