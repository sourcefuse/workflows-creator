import {
  StateMap,
  ActionWithInput,
  EventWithInput,
  RecordOfAnyType,
} from '../../types/base.types';
import {AbstractBaseGroup} from '../nodes';
import {Statement} from '../statement/statement.class';

export abstract class BuilderService<E, S extends RecordOfAnyType> {
  abstract build(
    statement: Statement<E>,
    elseStatement: Statement<E>,
  ): Promise<string>;
  abstract restore(model: string): Promise<{
    actions: ActionWithInput<E>[];
    elseActions: ActionWithInput<E>[];
    events: EventWithInput<E>[];
    groups: AbstractBaseGroup<E>[];
    state: StateMap<S>;
    process: E & {id: string};
  }>;
}
