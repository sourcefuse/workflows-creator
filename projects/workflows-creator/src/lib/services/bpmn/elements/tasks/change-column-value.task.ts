import {Inject, Injectable} from '@angular/core';
import {State} from '../../../../classes';
import {ENV, RecordOfAnyType} from '../../../../types';
import {CreateStrategy, LinkStrategy} from '../../../../interfaces';
import {ModdleElement} from '../../../../types/bpmn.types';
import {UtilsService} from '../../../utils.service';
import {CREATE_TASK_STRATEGY} from '../../strategies/create';
import {LINK_BASIC_STRATEGY} from '../../strategies/link';
import {ServiceTaskElement} from './service-task.task';
import {ENV_TOKEN} from '../../../../token';
import {InputTypes} from '../../../../enum';

@Injectable()
export class ChangeColumnValue extends ServiceTaskElement {
  constructor(
    @Inject(CREATE_TASK_STRATEGY)
    protected creator: CreateStrategy<ModdleElement>,
    @Inject(LINK_BASIC_STRATEGY)
    protected linker: LinkStrategy<ModdleElement>,
    @Inject(ENV_TOKEN) protected env: ENV,
    public utils: UtilsService,
  ) {
    super();
    this.attributes = {
      ...this.attributes,
      'camunda:topic': `change-task-column-value-${this.env?.envIdentifier}`,
    };
  }
  name = 'change column value';
  properties = {};
  inputs = {
    name: 'pathParams',
    fields: {
      taskIds: {
        from: 'taskIds',
      },
      groupColumnId: {
        state: 'column',
      },
      boardId: {
        state: 'boardId',
      },
      changedValue: {
        formatter: <S extends RecordOfAnyType>(state: State<S>) => {
          switch (state.get('valueInputType')) {
            case InputTypes.People:
              return `'${JSON.stringify(state.get('value'))}'`;
            case InputTypes.List:
              if (!state.get('value')) return '';
              return `'${JSON.stringify({
                displayValue: state.get('value').text?.split('"').join(''),
                value: state.get('value').value,
                iconClass: state.get('value').iconClass,
                color: state.get('value').color,
                bgColor: state.get('value').bgColor,
              })}'`;
            default:
              return `'{"displayValue": "${
                state.get('valueName')?.split('"').join('') ??
                state.get('value')
              }", "value": "${state.get('value')}"}'`;
          }
        },
      },
    },
  };
  outputs = 'outputVariable';
  static identifier = 'ChangeColumnValue';

  getIdentifier(): string {
    return ChangeColumnValue.identifier;
  }
}
