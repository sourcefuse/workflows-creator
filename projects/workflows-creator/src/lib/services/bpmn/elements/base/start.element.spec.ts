import {
  CreateStrategy,
  ModdleElement,
  LinkStrategy,
} from 'projects/workflows-creator/src/public-api';
import {UtilsService} from '../../../utils.service';
import {StartElement} from './start.element';

describe('StartElement', () => {
  let startElement: StartElement;
  let creator: CreateStrategy<ModdleElement>;
  let linker: LinkStrategy<ModdleElement>;
  let utils: UtilsService;

  beforeEach(() => {
    creator = jasmine.createSpyObj('CreateStrategy', ['create']);
    linker = jasmine.createSpyObj('LinkStrategy', ['link']);
    utils = jasmine.createSpyObj('UtilsService', ['uuid']);

    startElement = new StartElement(creator, linker, utils);
  });

  it('should create an instance of StartElement', () => {
    expect(startElement).toBeTruthy();
  });

  it('should have the correct tag', () => {
    expect(startElement.tag).toBe('bpmn:StartEvent');
  });

  it('should have empty attributes', () => {
    expect(startElement.attributes).toEqual({});
  });

  it('should have the correct name', () => {
    expect(startElement.name).toBe('start');
  });

  it('should have empty inputs', () => {
    expect(startElement.inputs).toBeUndefined();
  });

  it('should have empty outputs', () => {
    expect(startElement.outputs).toBeUndefined();
  });

  it('should have the correct identifier', () => {
    expect(startElement.getIdentifier()).toBe('StartElement');
  });
});
