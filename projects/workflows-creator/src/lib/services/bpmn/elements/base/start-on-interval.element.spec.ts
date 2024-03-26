import {
  CreateStrategy,
  ModdleElement,
  LinkStrategy,
} from 'projects/workflows-creator/src/public-api';
import {UtilsService} from '../../../utils.service';
import {StartOnIntervalElement} from './start-on-interval.element';

describe('StartOnIntervalElement', () => {
  let startOnIntervalElement: StartOnIntervalElement;
  let creator: CreateStrategy<ModdleElement>;
  let linker: LinkStrategy<ModdleElement>;
  let utils: UtilsService;

  beforeEach(() => {
    creator = jasmine.createSpyObj('CreateStrategy', ['create']);
    linker = jasmine.createSpyObj('LinkStrategy', ['link']);
    utils = jasmine.createSpyObj('UtilsService', ['uuid']);

    startOnIntervalElement = new StartOnIntervalElement(creator, linker, utils);
  });

  it('should create an instance', () => {
    expect(startOnIntervalElement).toBeTruthy();
  });

  it('should have the correct tag', () => {
    expect(startOnIntervalElement.tag).toBe('bpmn:StartEvent');
  });

  it('should have empty attributes', () => {
    expect(startOnIntervalElement.attributes).toEqual({});
  });

  it('should have the correct name', () => {
    expect(startOnIntervalElement.name).toBe('start');
  });

  it('should have the correct identifier', () => {
    expect(startOnIntervalElement.getIdentifier()).toBe(
      StartOnIntervalElement.identifier,
    );
  });
});
