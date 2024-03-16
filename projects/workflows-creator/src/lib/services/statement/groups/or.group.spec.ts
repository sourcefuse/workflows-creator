import {NodeTypes} from '../../../enum';
import {RecordOfAnyType} from '../../../types';
import {OrGroup} from './or.group';

describe('OrGroup', () => {
  let group: OrGroup<any>;
  let localizedStringMap: RecordOfAnyType = {};
  let id = '';
  let type = NodeTypes.GROUP;

  beforeEach(() => {
    group = new OrGroup(localizedStringMap, id, type);
  });

  it('should create an instance of OrGroup', () => {
    expect(group).toBeDefined();
    expect(group instanceof OrGroup).toBeTruthy();
  });

  it('should set the properties correctly', () => {
    expect(group.id).toEqual(id);
    expect(group.type).toEqual(NodeTypes.GROUP);
    expect(group.isElseGroup).toBeFalsy();
    expect(group.children).toEqual([]);
    expect(group.trigger).toBeFalsy();
    expect(group.name).toEqual('or');
    expect(group.nodeType).toEqual(type);
  });

  it('should return the correct identifier', () => {
    expect(group.getIdentifier()).toEqual('OrGroup');
  });
});
