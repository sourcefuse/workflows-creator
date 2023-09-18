import {Inject, Injectable} from '@angular/core';
import {ENV} from '../../../../types/base.types';
import {CreateStrategy, LinkStrategy} from '../../../../interfaces';
import {ModdleElement} from '../../../../types/bpmn.types';
import {UtilsService} from '../../../utils.service';
import {CREATE_TASK_STRATEGY} from '../../strategies/create';
import {LINK_BASIC_STRATEGY} from '../../strategies/link';
import {ServiceTaskElement} from './service-task.task';
import {ENV_TOKEN} from '../../../../token';

@Injectable()
export class TriggerWhenColumnChanges extends ServiceTaskElement {
  constructor(
    @Inject(CREATE_TASK_STRATEGY)
    protected creator: CreateStrategy<ModdleElement>,
    @Inject(LINK_BASIC_STRATEGY)
    protected linker: LinkStrategy<ModdleElement>,
    @Inject(ENV_TOKEN) protected env: ENV,
    public utils: UtilsService,
  ) {
    super();
    this.env =
      this.env ??
      (
        window as Window &
          typeof globalThis & {workflowEnv: {envIdentifier: string}}
      ).workflowEnv;
    this.attributes = {
      ...this.attributes,
      'camunda:topic': `trigger-on-tcv-change-${this.env?.envIdentifier}`,
    };
  }
  name = 'trigger when column value changes';
  properties = {};
  inputs = {
    name: 'pathParams',
    fields: {
      groupColumnId: {
        state: 'column',
      },
      boardId: {
        state: 'boardId',
      },
    },
  };
  outputs = 'outputVariable';
  static identifier = 'TriggerWhenColumnChanges';

  getIdentifier(): string {
    return TriggerWhenColumnChanges.identifier;
  }
}
