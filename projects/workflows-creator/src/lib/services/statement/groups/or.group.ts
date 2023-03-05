import {AbstractBaseGroup} from '../../../classes/nodes';
import {NodeTypes} from '../../../enum';

/**
 * @description
 * This class creates a group of nodes that are connected via OR grouping.
 * @param id
 * @param type
 */

export class OrGroup<E> extends AbstractBaseGroup<E> {
  isElseGroup = false;
  type = NodeTypes.GROUP;
  children = [];
  trigger = false;
  name = 'or';
  nodeType: NodeTypes;
  static identifier = 'OrGroup';
  constructor(id: string, type: NodeTypes) {
    super();
    this.nodeType = type;
    this.id = id;
  }

  getIdentifier(): string {
    return OrGroup.identifier;
  }
}
