import {TestBed} from '@angular/core/testing';
import {CustomBpmnModdle, ModdleElement} from '../../../../types/bpmn.types';
import {UtilsService} from '../../../utils.service';
import {CreateTaskStrategy} from './task-create.strategy';
import {
  CreateStrategy,
  LinkStrategy,
} from 'projects/workflows-creator/src/public-api';

describe('CreateTaskStrategy', () => {
  let strategy: CreateTaskStrategy;
  let moddleMock: jasmine.SpyObj<CustomBpmnModdle>;
  let utilsServiceMock: jasmine.SpyObj<UtilsService>;

  beforeEach(() => {
    moddleMock = jasmine.createSpyObj('CustomBpmnModdle', ['create']);
    utilsServiceMock = jasmine.createSpyObj('UtilsService', ['uuid']);

    TestBed.configureTestingModule({
      providers: [
        CreateTaskStrategy,
        {provide: CustomBpmnModdle, useValue: moddleMock},
        {provide: UtilsService, useValue: utilsServiceMock},
      ],
    });

    strategy = TestBed.inject(CreateTaskStrategy);
  });

  it('should be created', () => {
    expect(strategy).toBeTruthy();
  });
});
