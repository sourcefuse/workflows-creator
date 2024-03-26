import {
  CreateStrategy,
  ModdleElement,
  LinkStrategy,
  ENV,
} from 'projects/workflows-creator/src/public-api';
import {UtilsService} from '../../../utils.service';
import {TriggerOnInterval} from './trigger-on-interval.task';

describe('TriggerOnInterval', () => {
  let triggerOnInterval: TriggerOnInterval;
  let creator: CreateStrategy<ModdleElement>;
  let linker: LinkStrategy<ModdleElement>;
  let env: ENV;
  let utils: UtilsService;

  beforeEach(() => {
    creator = jasmine.createSpyObj('CreateStrategy', ['create']);
    linker = jasmine.createSpyObj('LinkStrategy', ['link']);
    env = {envIdentifier: 'test'};
    utils = jasmine.createSpyObj('UtilsService', ['']);

    triggerOnInterval = new TriggerOnInterval(creator, linker, env, utils);
  });

  it('should create TriggerOnInterval', () => {
    expect(triggerOnInterval).toBeTruthy();
  });

  it('should have name as "trigger on interval"', () => {
    expect(triggerOnInterval.name).toBe('trigger on interval');
  });

  it('should have empty properties', () => {
    expect(triggerOnInterval.properties).toEqual({});
  });

  it('should have inputs with name "pathParams" and fields', () => {
    expect(triggerOnInterval.inputs.name).toBe('pathParams');
    expect(triggerOnInterval.inputs.fields).toEqual({
      groupId: {state: 'groupId'},
      boardId: {state: 'boardId'},
      timescale: {state: 'timescale'},
    });
  });

  it('should have outputs as "outputVariable"', () => {
    expect(triggerOnInterval.outputs).toBe('outputVariable');
  });

  it('should have identifier as "TriggerOnInterval"', () => {
    expect(TriggerOnInterval.identifier).toBe('TriggerOnInterval');
  });

  it('should return identifier as "TriggerOnInterval"', () => {
    const identifier = triggerOnInterval.getIdentifier();
    expect(identifier).toBe('TriggerOnInterval');
  });
});
