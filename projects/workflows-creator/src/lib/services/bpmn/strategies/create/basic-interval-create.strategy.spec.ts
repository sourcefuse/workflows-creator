import {TestBed} from '@angular/core/testing';
import {
  CustomBpmnModdle,
  ModdleElement,
  RecordOfAnyType,
} from '../../../../types';
import {UtilsService} from '../../../utils.service';
import {CreateBasicIntervalStrategy} from './basic-interval-create.strategy';

describe('CreateBasicIntervalStrategy', () => {
  let service: CreateBasicIntervalStrategy;
  let moddleMock: jasmine.SpyObj<CustomBpmnModdle>;
  let utilsMock: jasmine.SpyObj<UtilsService>;
  beforeEach(() => {
    moddleMock = jasmine.createSpyObj('CustomBpmnModdle', ['create']);
    utilsMock = jasmine.createSpyObj('UtilsService', ['uuid']);

    TestBed.configureTestingModule({
      providers: [
        CreateBasicIntervalStrategy,
        {provide: CustomBpmnModdle, useValue: moddleMock},
        {provide: UtilsService, useValue: utilsMock},
      ],
    });

    service = TestBed.inject(CreateBasicIntervalStrategy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('parseAttributes', () => {
    it('should parse state references in attributes', () => {
      // Mocking necessary data
      const attrs: RecordOfAnyType = {someAttr: {state: 'someStateKey'}};
      const node: any = {
        workflowNode: {state: new Map([['someStateKey', 'mockedStateValue']])},
      };

      // Calling the method under test
      const result = service['parseAttributes'](attrs, node);

      // Expectations
      expect(result).toEqual({someAttr: 'mockedStateValue'});
    });

    it('should leave non-state reference attributes unchanged', () => {
      // Mocking necessary data
      const attrs: RecordOfAnyType = {someAttr: 'someValue'};
      const node: any = {workflowNode: {state: new Map()}};

      // Calling the method under test
      const result = service['parseAttributes'](attrs, node);

      // Expectations
      expect(result).toEqual(attrs);
    });
  });
});
