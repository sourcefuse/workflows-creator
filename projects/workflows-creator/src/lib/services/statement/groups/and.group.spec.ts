import {NodeTypes} from '../../../enum';
import {RecordOfAnyType} from '../../../types';
import {AndGroup} from './and.group';

describe('AndGroup', () => {
  let group: AndGroup<any>;
  let localizedStringMap: RecordOfAnyType = {};
  let id = '';
  let type = NodeTypes.GROUP;
  let isElseGroup = false;

  beforeEach(() => {
    group = new AndGroup(localizedStringMap, id, type, isElseGroup);
  });

  it('should create an instance of AndGroup', () => {
    expect(group).toBeDefined();
    expect(group instanceof AndGroup).toBeTruthy();
  });

  it('should set the properties correctly', () => {
    expect(group.id).toEqual(id);
    expect(group.type).toEqual(NodeTypes.GROUP);
    expect(group.isElseGroup).toEqual(isElseGroup);
    expect(group.children).toEqual([]);
    expect(group.trigger).toEqual(true);
    expect(group.name).toEqual('and');
    expect(group.nodeType).toEqual(type);
  });

  it('should return the correct identifier', () => {
    expect(group.getIdentifier()).toEqual('AndGroup');
  });
});
