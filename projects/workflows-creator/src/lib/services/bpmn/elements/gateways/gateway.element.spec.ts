import {
  CreateStrategy,
  ModdleElement,
  LinkStrategy,
  ElementTypes,
} from 'projects/workflows-creator/src/public-api';
import {UtilsService} from '../../../utils.service';
import {GatewayElement} from './gateway.element';

describe('GatewayElement', () => {
  let gatewayElement: GatewayElement;
  let creator: CreateStrategy<ModdleElement>;
  let linker: LinkStrategy<ModdleElement>;
  let utils: UtilsService;

  beforeEach(() => {
    creator = jasmine.createSpyObj('CreateStrategy', ['create']);
    linker = jasmine.createSpyObj('LinkStrategy', ['link']);
    utils = jasmine.createSpyObj('UtilsService', ['']);

    gatewayElement = new GatewayElement(creator, linker, utils);
  });

  it('should create an instance of GatewayElement', () => {
    expect(gatewayElement).toBeTruthy();
  });

  it('should have tag property set to "bpmn:ExclusiveGateway"', () => {
    expect(gatewayElement.tag).toBe('bpmn:ExclusiveGateway');
  });

  it('should have name property set to "gateway"', () => {
    expect(gatewayElement.name).toBe('gateway');
  });

  it('should have properties property set to an empty object', () => {
    expect(gatewayElement.properties).toEqual({});
  });

  it('should have statement property set to undefined', () => {
    expect(gatewayElement.statement).toBeUndefined();
  });

  it('should have attributes property with name property set to { state: "condition" }', () => {
    expect(gatewayElement.attributes).toEqual({
      name: {
        state: 'condition',
      },
    });
  });

  it('should have elseOutGoing property set to undefined', () => {
    expect(gatewayElement.elseOutGoing).toBeUndefined();
  });

  it('should have default property set to undefined', () => {
    expect(gatewayElement.default).toBeUndefined();
  });

  it('should have inputs property set to undefined', () => {
    expect(gatewayElement.inputs).toBeUndefined();
  });

  it('should have outputs property set to undefined', () => {
    expect(gatewayElement.outputs).toBeUndefined();
  });

  it('should have identifier property set to "GatewayElement"', () => {
    expect(gatewayElement.getIdentifier()).toBe('GatewayElement');
  });
});
