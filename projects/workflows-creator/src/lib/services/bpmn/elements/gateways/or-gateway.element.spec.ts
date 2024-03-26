import {
  CreateStrategy,
  ModdleElement,
  LinkStrategy,
  ElementTypes,
} from 'projects/workflows-creator/src/public-api';
import {UtilsService} from '../../../utils.service';
import {OrGatewayElement} from './or-gateway.element';

describe('OrGatewayElement', () => {
  let orGatewayElement: OrGatewayElement;
  let creator: CreateStrategy<ModdleElement>;
  let linker: LinkStrategy<ModdleElement>;
  let utils: UtilsService;

  beforeEach(() => {
    creator = jasmine.createSpyObj('CreateStrategy', ['create']);
    linker = jasmine.createSpyObj('LinkStrategy', ['link']);
    utils = jasmine.createSpyObj('UtilsService', ['']);

    orGatewayElement = new OrGatewayElement(creator, linker, utils);
  });

  it('should create an instance of OrGatewayElement', () => {
    expect(orGatewayElement).toBeTruthy();
  });

  it('should have tag property set to "bpmn:ExclusiveGateway"', () => {
    expect(orGatewayElement.tag).toBe('bpmn:ExclusiveGateway');
  });

  it('should have name property set to "orgateway"', () => {
    expect(orGatewayElement.name).toBe('orgateway');
  });

  it('should have properties property set to an empty object', () => {
    expect(orGatewayElement.properties).toEqual({});
  });

  it('should have statement property set to undefined', () => {
    expect(orGatewayElement.statement).toBeUndefined();
  });

  it('should have attributes property set to an object with name property set to "merge OR"', () => {
    expect(orGatewayElement.attributes).toEqual({name: 'merge OR'});
  });

  it('should have elseOutGoing property set to undefined', () => {
    expect(orGatewayElement.elseOutGoing).toBeUndefined();
  });

  it('should have default property set to undefined', () => {
    expect(orGatewayElement.default).toBeUndefined();
  });

  it('should have inputs property set to undefined', () => {
    expect(orGatewayElement.inputs).toBeUndefined();
  });

  it('should have outputs property set to undefined', () => {
    expect(orGatewayElement.outputs).toBeUndefined();
  });

  it('should have identifier property set to "OrGatewayElement"', () => {
    expect(OrGatewayElement.identifier).toBe('OrGatewayElement');
  });

  describe('getIdentifier', () => {
    it('should return the identifier of OrGatewayElement', () => {
      expect(orGatewayElement.getIdentifier()).toBe('OrGatewayElement');
    });
  });
});
