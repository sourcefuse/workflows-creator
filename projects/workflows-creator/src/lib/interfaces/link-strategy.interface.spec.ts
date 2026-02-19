import {StatementNode} from '../classes';
import {WorkflowElement} from '../classes/element/abstract-element.class';
import {LinkStrategy} from './link-strategy.interface';
import {CreateStrategy} from './create-strategy.interface';
import {ElementInput} from './element-input.interface';
import {TestElement} from './test-element.interface';
import {RecordOfAnyType} from '../types';

class MockWorkflowElement<T> extends WorkflowElement<T> {
  tag = 'mock-tag';
  attributes: RecordOfAnyType = {};
  name = 'mock-element';
  inputs: ElementInput = {name: 'mock', fields: {}};
  outputs = '';
  protected creator: CreateStrategy<T> = {
    execute: () => ({} as T),
  };
  protected linker: LinkStrategy<T> = {
    execute: () => [],
  };
  getIdentifier(): string {
    return 'mock-identifier';
  }
}

describe('LinkStrategy', () => {
  let linkStrategy: LinkStrategy<TestElement>;

  beforeEach(() => {
    linkStrategy = {
      execute: (
        element: WorkflowElement<TestElement>,
        node: StatementNode<TestElement>,
      ): TestElement[] => {
        return [];
      },
    };
  });

  it('should implement the execute method', () => {
    expect(linkStrategy.execute).toBeDefined();
  });

  it('execute method should return an empty array', () => {
    const mockElement = new MockWorkflowElement<TestElement>();
    const mockNode = new StatementNode<TestElement>(mockElement);

    const result = linkStrategy.execute(mockElement, mockNode);
    expect(result).toEqual([]);
  });
});
