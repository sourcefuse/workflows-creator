import {CreateStrategy} from '../../interfaces/create-strategy.interface';
import {LinkStrategy} from '../../interfaces/link-strategy.interface';
import {StatementNode} from '../statement/statement-node.class';
import {WorkflowElement} from './abstract-element.class';

class TestWorkflowElement extends WorkflowElement<any> {
  tag = 'TestTag';
  attributes = {};
  name = 'TestName';
  inputs = {name: 'TestInput', fields: {}};
  outputs = 'TestOutput';
  protected creator: CreateStrategy<any>;
  protected linker: LinkStrategy<any>;

  constructor() {
    super();
    this.creator = {
      execute: jasmine.createSpy('creatorExecute'),
    } as unknown as CreateStrategy<any>;
    this.linker = {
      execute: jasmine.createSpy('linkerExecute'),
    } as unknown as LinkStrategy<any>;
  }

  getIdentifier(): string {
    return 'TestIdentifier';
  }
}

describe('WorkflowElement', () => {
  let testWorkflowElement: TestWorkflowElement;

  beforeEach(() => {
    testWorkflowElement = new TestWorkflowElement();
  });

  it('should create', () => {
    expect(testWorkflowElement).toBeTruthy();
  });

  describe('create', () => {
    it('should call creator.execute with correct arguments', () => {
      // Arrange
      const node = {} as StatementNode<any>;
      const attrs = {};

      // Act
      testWorkflowElement.create(node, attrs);
    });
  });

  describe('link', () => {
    it('should call linker.execute with correct arguments', () => {
      // Arrange
      const node = {} as StatementNode<any>;

      // Act
      testWorkflowElement.link(node);
    });
  });

  describe('getIdentifier', () => {
    it('should return the identifier', () => {
      // Act
      const identifier = testWorkflowElement.getIdentifier();

      // Assert
      expect(identifier).toBe('TestIdentifier');
    });
  });
});
