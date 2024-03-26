import {UtilsService} from '../../../utils.service';
import {CreateStrategy, LinkStrategy} from '../../../../interfaces';
import {ModdleElement} from '../../../../types/bpmn.types';
import {TestBed} from '@angular/core/testing';
import {CREATE_TASK_STRATEGY} from '../../strategies/create';
import {LINK_BASIC_STRATEGY} from '../../strategies/link';
import {ENV_TOKEN} from '../../../../token';
import {SendEmail} from './send-email.task';

describe('SendEmail', () => {
  let sendEmail: SendEmail;
  let createStrategy: CreateStrategy<ModdleElement>;
  let linkStrategy: LinkStrategy<ModdleElement>;
  let env: any; // Mocked environment
  let utilsService: UtilsService;

  beforeEach(() => {
    env = {
      envIdentifier: 'testEnv',
    };

    TestBed.configureTestingModule({
      providers: [
        SendEmail,
        UtilsService,
        {provide: CREATE_TASK_STRATEGY, useValue: {}},
        {provide: LINK_BASIC_STRATEGY, useValue: {}},
        {provide: ENV_TOKEN, useValue: env},
      ],
    });

    sendEmail = TestBed.inject(SendEmail);
    createStrategy = TestBed.inject(CREATE_TASK_STRATEGY);
    linkStrategy = TestBed.inject(LINK_BASIC_STRATEGY);
    utilsService = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(sendEmail).toBeTruthy();
  });
});
