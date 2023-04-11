import {AbstractBaseGroup} from '../../../classes/nodes';
import {NodeTypes} from '../../../enum';
import {RecordOfAnyType} from '../../../types';

/**
 * @description
 * This class creates a group of nodes that are connected via AND grouping.
 * @param id
 * @param type
 */
export class AndGroup<E> extends AbstractBaseGroup<E> {
  isElseGroup: boolean;
  type = NodeTypes.GROUP;
  children = [];
  trigger = true;
  name = 'and';
  nodeType: NodeTypes;
  static identifier = 'AndGroup';
  constructor(
    localizedStringMap: RecordOfAnyType,
    id: string,
    type: NodeTypes,
    isElseGroup?: boolean,
  ) {
    super();
    this.nodeType = type;
    this.id = id;
    this.isElseGroup = isElseGroup || false;
  }

  getIdentifier(): string {
    return AndGroup.identifier;
  }
}
