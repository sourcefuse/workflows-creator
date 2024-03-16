import {TestBed} from '@angular/core/testing';

import {CustomBpmnModdle} from '../../../../types';
import {UtilsService} from '../../../utils.service';
import {BpmnStatementNode} from '../../../../types/bpmn.types';
import {CreateGatewayStrategy} from './gateway-create.strategy';

describe('CreateGatewayStrategy', () => {
  let service: CreateGatewayStrategy;
  let moddleMock: jasmine.SpyObj<CustomBpmnModdle>;
  let utilsMock: jasmine.SpyObj<UtilsService>;

  beforeEach(() => {
    moddleMock = jasmine.createSpyObj('CustomBpmnModdle', ['create']);
    utilsMock = jasmine.createSpyObj('UtilsService', ['uuid']);

    TestBed.configureTestingModule({
      providers: [
        CreateGatewayStrategy,
        {provide: CustomBpmnModdle, useValue: moddleMock},
        {provide: UtilsService, useValue: utilsMock},
      ],
    });

    service = TestBed.inject(CreateGatewayStrategy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('parseAttributes', () => {
    it('should parse state references in attributes', () => {
      const attrs = {};
      const node = {} as BpmnStatementNode;

      const parsedAttrs = service['parseAttributes'](attrs, node);
    });
  });
});
