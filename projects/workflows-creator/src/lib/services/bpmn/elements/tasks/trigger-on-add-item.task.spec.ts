import {UtilsService} from '../../../utils.service';
import {CreateStrategy, LinkStrategy} from '../../../../interfaces';
import {ModdleElement} from '../../../../types/bpmn.types';
import {TestBed} from '@angular/core/testing';
import {CREATE_TASK_STRATEGY} from '../../strategies/create';
import {LINK_BASIC_STRATEGY} from '../../strategies/link';
import {ENV_TOKEN} from '../../../../token';
import {TriggerOnAddItem} from './trigger-on-add-item.task';

describe('TriggerOnAddItem', () => {
  let triggerOnAddItem: TriggerOnAddItem;
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
        TriggerOnAddItem,
        UtilsService,
        {provide: CREATE_TASK_STRATEGY, useValue: {}},
        {provide: LINK_BASIC_STRATEGY, useValue: {}},
        {provide: ENV_TOKEN, useValue: env},
      ],
    });

    triggerOnAddItem = TestBed.inject(TriggerOnAddItem);
    createStrategy = TestBed.inject(CREATE_TASK_STRATEGY);
    linkStrategy = TestBed.inject(LINK_BASIC_STRATEGY);
    utilsService = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(triggerOnAddItem).toBeTruthy();
  });

  it('should have the correct name', () => {
    expect(triggerOnAddItem.name).toEqual('trigger on add item');
  });

  it('should have the correct inputs', () => {
    expect(triggerOnAddItem.inputs).toEqual({
      name: 'pathParams',
      fields: {
        groupId: {
          state: 'groupId',
        },
        boardId: {
          state: 'boardId',
        },
      },
    });
  });

  it('should have the correct outputs', () => {
    expect(triggerOnAddItem.outputs).toEqual('outputVariable');
  });
});
