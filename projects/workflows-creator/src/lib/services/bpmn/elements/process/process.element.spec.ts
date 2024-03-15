import {
  CreateStrategy,
  ModdleElement,
  LinkStrategy,
} from 'projects/workflows-creator/src/public-api';
import {UtilsService} from '../../../utils.service';
import {ProcessElement} from './process.element';

describe('ProcessElement', () => {
  let processElement: ProcessElement;
  let creator: CreateStrategy<ModdleElement>;
  let linker: LinkStrategy<ModdleElement>;
  let utils: UtilsService;

  beforeEach(() => {
    creator = jasmine.createSpyObj('CreateStrategy', ['create']);
    linker = jasmine.createSpyObj('LinkStrategy', ['link']);
    utils = jasmine.createSpyObj('UtilsService', ['uuid']);

    processElement = new ProcessElement(creator, linker, utils);
  });

  it('should create an instance of ProcessElement', () => {
    expect(processElement).toBeTruthy();
  });

  it('should have the correct tag', () => {
    expect(processElement.tag).toEqual('bpmn:Process');
  });

  it('should have the correct name', () => {
    expect(processElement.name).toEqual('process');
  });

  it('should have the correct identifier', () => {
    expect(ProcessElement.identifier).toEqual('ProcessElement');
  });

  it('should have the correct attributes', () => {
    expect(processElement.attributes).toEqual({
      isExecutable: true,
    });
  });

  it('should have the correct getIdentifier method', () => {
    expect(processElement.getIdentifier()).toEqual('ProcessElement');
  });
});
