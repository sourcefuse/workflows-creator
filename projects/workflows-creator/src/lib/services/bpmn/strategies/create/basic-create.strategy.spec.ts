import {CreateBasicStrategy} from 'projects/workflows-creator/src/lib';
import {UtilsService} from '../../../utils.service';

describe('CreateBasicStrategy', () => {
  let createBasicStrategy: CreateBasicStrategy;
  let moddleMock: any;
  let utilsServiceMock: UtilsService;

  beforeEach(() => {
    moddleMock = jasmine.createSpyObj('CustomBpmnModdle', ['create']);
    utilsServiceMock = {
      uuid: jasmine.createSpy('uuid'),
    } as UtilsService;

    createBasicStrategy = new CreateBasicStrategy(moddleMock, utilsServiceMock);
  });

  it('should be created', () => {
    expect(createBasicStrategy).toBeTruthy();
  });

  describe('parseAttributes', () => {
    it('should parse attributes and replace state values with actual state', () => {
      // Arrange
      const attrs = {attr1: 'value1', attr2: {state: 'stateKey'}};
      const node = jasmine.createSpyObj('BpmnStatementNode', ['workflowNode']);
      node.workflowNode.state = new Map().set('stateKey', 'stateValue');
      // Act
      const result = createBasicStrategy['parseAttributes'](attrs, node);
      // Assert
      expect(result).toEqual({attr1: 'value1', attr2: 'stateValue'});
    });
  });
});
