import {WorkflowElement} from '../../classes/element';
import {StatementNode} from '../../classes/statement';
import {BPMN_ELEMENTS} from '../../const';
import {InvalidEntityError, NotProvided} from '../../errors/base.error';
import {TestBed} from '@angular/core/testing';
import {Injector} from '@angular/core';
import {BpmnElementService} from './element.service';

describe('BpmnElementService', () => {
  let bpmnElementService: BpmnElementService<any>;
  let elements: WorkflowElement<any>[];
  let injector: Injector;

  beforeEach(() => {
    elements = []; // Define your mock elements here
    injector = jasmine.createSpyObj('Injector', ['get']);

    TestBed.configureTestingModule({
      providers: [
        BpmnElementService,
        {provide: BPMN_ELEMENTS, useValue: elements},
        {provide: Injector, useValue: injector},
      ],
    });

    bpmnElementService = TestBed.inject(BpmnElementService);
  });

  it('should be created', () => {
    expect(bpmnElementService).toBeTruthy();
  });

  // Add more test cases as needed
});
