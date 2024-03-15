import {NodeTypes} from '../../enum';
import {NodeWithInput} from '../../types';
import {AbstractBaseGroup} from './abstract-base-group.class';

class MockBaseGroup extends AbstractBaseGroup<any> {
  type = NodeTypes.GROUP;
  nodeType = NodeTypes.GROUP;
  trigger = false;
  name = 'MockGroup';
  children: NodeWithInput<any>[] = [];
  isElseGroup = false;
  id = 'mockGroupId';

  getIdentifier(): string {
    return 'MockGroupIdentifier';
  }
}

describe('AbstractBaseGroup', () => {
  let mockBaseGroup: MockBaseGroup;

  beforeEach(() => {
    mockBaseGroup = new MockBaseGroup();
  });

  it('should create', () => {
    expect(mockBaseGroup).toBeTruthy();
  });

  it('should have correct type', () => {
    expect(mockBaseGroup.type).toBe(NodeTypes.GROUP);
  });

  it('should have correct nodeType', () => {
    expect(mockBaseGroup.nodeType).toBe(NodeTypes.GROUP);
  });

  it('should have correct trigger value', () => {
    expect(mockBaseGroup.trigger).toBe(false);
  });

  it('should have correct name', () => {
    expect(mockBaseGroup.name).toBe('MockGroup');
  });

  it('should have an empty children array', () => {
    expect(mockBaseGroup.children).toEqual([]);
  });

  it('should have correct isElseGroup value', () => {
    expect(mockBaseGroup.isElseGroup).toBe(false);
  });

  it('should have correct id', () => {
    expect(mockBaseGroup.id).toBe('mockGroupId');
  });

  it('should return correct identifier', () => {
    expect(mockBaseGroup.getIdentifier()).toBe('MockGroupIdentifier');
  });
});
