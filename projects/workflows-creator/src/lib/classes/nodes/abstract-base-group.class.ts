import {NodeTypes} from '../../enum';
import {NodeWithInput} from '../../types';

export abstract class AbstractBaseGroup<E> {
  abstract type: NodeTypes;
  abstract nodeType: NodeTypes;
  abstract trigger: boolean;
  abstract name: string;
  abstract children: NodeWithInput<E>[];
  abstract isElseGroup: boolean;
  id: string;

  abstract getIdentifier(): string;
}
