import {UtilsService} from '../../../utils.service';
import {CreateStrategy, LinkStrategy} from '../../../../interfaces';
import {ModdleElement} from '../../../../types/bpmn.types';
import {TestBed} from '@angular/core/testing';
import {CREATE_TASK_STRATEGY} from '../../strategies/create';
import {LINK_BASIC_STRATEGY} from '../../strategies/link';
import {ENV_TOKEN} from '../../../../token';
import {TriggerWhenColumnChanges} from './trigger-when-column-changes.task';

describe('TriggerWhenColumnChanges', () => {
  let triggerWhenColumnChanges: TriggerWhenColumnChanges;
  let createStrategy: CreateStrategy<ModdleElement>;
  let linkStrategy: LinkStrategy<ModdleElement>;
  let env: any;
  let utilsService: UtilsService;

  beforeEach(() => {
    env = {
      envIdentifier: 'testEnv',
    };

    TestBed.configureTestingModule({
      providers: [
        TriggerWhenColumnChanges,
        UtilsService,
        {provide: CREATE_TASK_STRATEGY, useValue: {}},
        {provide: LINK_BASIC_STRATEGY, useValue: {}},
        {provide: ENV_TOKEN, useValue: env},
      ],
    });

    triggerWhenColumnChanges = TestBed.inject(TriggerWhenColumnChanges);
    createStrategy = TestBed.inject(CREATE_TASK_STRATEGY);
    linkStrategy = TestBed.inject(LINK_BASIC_STRATEGY);
    utilsService = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(triggerWhenColumnChanges).toBeTruthy();
  });

  it('should have the correct name', () => {
    expect(triggerWhenColumnChanges.name).toEqual(
      'trigger when column value changes',
    );
  });

  it('should have the correct inputs', () => {
    expect(triggerWhenColumnChanges.inputs).toEqual({
      name: 'pathParams',
      fields: {
        groupColumnId: {
          state: 'column',
        },
        boardId: {
          state: 'boardId',
        },
      },
    });
  });

  it('should have the correct outputs', () => {
    expect(triggerWhenColumnChanges.outputs).toEqual('outputVariable');
  });
});
