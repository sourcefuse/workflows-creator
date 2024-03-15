import {
  CreateStrategy,
  ModdleElement,
  LinkStrategy,
} from 'projects/workflows-creator/src/public-api';
import {UtilsService} from '../../../utils.service';
import {EndElement} from './end.element';

describe('EndElement', () => {
  let endElement: EndElement;
  let creator: CreateStrategy<ModdleElement>;
  let linker: LinkStrategy<ModdleElement>;
  let utils: UtilsService;

  beforeEach(() => {
    creator = jasmine.createSpyObj('CreateStrategy', ['create']);
    linker = jasmine.createSpyObj('LinkStrategy', ['link']);
    utils = jasmine.createSpyObj('UtilsService', ['uuid']);

    endElement = new EndElement(creator, linker, utils);
  });

  it('should create an instance', () => {
    expect(endElement).toBeTruthy();
  });

  it('should have the correct tag', () => {
    expect(endElement.tag).toBe('bpmn:EndEvent');
  });

  it('should have empty attributes', () => {
    expect(endElement.attributes).toEqual({});
  });

  it('should have the correct name', () => {
    expect(endElement.name).toBe('end');
  });

  it('should have undefined statement', () => {
    expect(endElement.statement).toBeUndefined();
  });

  it('should have the correct identifier', () => {
    expect(endElement.getIdentifier()).toBe('EndElement');
  });
});
