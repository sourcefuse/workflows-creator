import {TestBed} from '@angular/core/testing';

import {BPMN_NODES, BPMN_INPUTS} from '../../const';

import {BaseGroup} from '../../types';
import {NodeTypes} from '../../enum';
import {UtilsService} from '../utils.service';
import {LocalizationProviderService} from '../localization-provider.service';
import {WorkflowElement} from '../../classes';
import {BpmnNodesService} from './node.service';

describe('BpmnNodesService', () => {
  let bpmnNodesService: BpmnNodesService<any>;
  let nodes: WorkflowElement<any>[];
  let groups: BaseGroup<any>[];
  let inputs: any[];
  let utilsService: UtilsService;
  let localizationProviderService: LocalizationProviderService;

  beforeEach(() => {
    nodes = []; // Define your mock nodes here
    groups = []; // Define your mock groups here
    inputs = []; // Define your mock inputs here
    utilsService = jasmine.createSpyObj('UtilsService', ['uuid']);
    localizationProviderService = jasmine.createSpyObj(
      'LocalizationProviderService',
      ['getLocalizedStringMap'],
    );

    TestBed.configureTestingModule({
      providers: [
        BpmnNodesService,
        {provide: BPMN_NODES, useValue: nodes},
        {provide: BPMN_INPUTS, useValue: inputs},
        {provide: UtilsService, useValue: utilsService},
        {
          provide: LocalizationProviderService,
          useValue: localizationProviderService,
        },
      ],
    });

    bpmnNodesService = TestBed.inject(BpmnNodesService);
  });

  it('should be created', () => {
    expect(bpmnNodesService).toBeTruthy();
  });

  // Add more test cases as needed
});
