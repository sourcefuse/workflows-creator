import {
  CreateStrategy,
  ModdleElement,
  LinkStrategy,
} from 'projects/workflows-creator/src/public-api';
import {UtilsService} from '../../../utils.service';
import {ProcessPropertiesElement} from './process-properties.element';

describe('ProcessPropertiesElement', () => {
  let processPropertiesElement: ProcessPropertiesElement;
  let creator: CreateStrategy<ModdleElement>;
  let linker: LinkStrategy<ModdleElement>;
  let utils: UtilsService;

  beforeEach(() => {
    creator = jasmine.createSpyObj('CreateStrategy', ['create']);
    linker = jasmine.createSpyObj('LinkStrategy', ['link']);
    utils = jasmine.createSpyObj('UtilsService', ['']);

    processPropertiesElement = new ProcessPropertiesElement(
      creator,
      linker,
      utils,
    );
  });

  it('should be created', () => {
    expect(processPropertiesElement).toBeTruthy();
  });

  it('should have tag property', () => {
    expect(processPropertiesElement.tag).toBeDefined();
  });

  it('should have name property', () => {
    expect(processPropertiesElement.name).toBeDefined();
  });

  it('should have type property', () => {
    expect(ProcessPropertiesElement.type).toBeDefined();
  });

  it('should have attributes property', () => {
    expect(processPropertiesElement.attributes).toBeDefined();
  });

  it('should have identifier property', () => {
    expect(ProcessPropertiesElement.identifier).toBeDefined();
  });

  describe('getIdentifier', () => {
    it('should return the identifier', () => {
      const identifier = processPropertiesElement.getIdentifier();
      expect(identifier).toBe(ProcessPropertiesElement.identifier);
    });
  });
});
