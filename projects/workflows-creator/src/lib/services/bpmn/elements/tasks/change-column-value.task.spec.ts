import {
  CreateStrategy,
  ModdleElement,
  LinkStrategy,
  ENV,
} from 'projects/workflows-creator/src/public-api';
import {UtilsService} from '../../../utils.service';
import {ChangeColumnValue} from './change-column-value.task';

describe('ChangeColumnValue', () => {
  let changeColumnValue: ChangeColumnValue;
  let creator: CreateStrategy<ModdleElement>;
  let linker: LinkStrategy<ModdleElement>;
  let env: ENV;
  let utils: UtilsService;

  beforeEach(() => {
    creator = jasmine.createSpyObj('CreateStrategy', ['create']);
    linker = jasmine.createSpyObj('LinkStrategy', ['link']);
    env = {envIdentifier: 'test'};
    utils = jasmine.createSpyObj('UtilsService', ['']);

    changeColumnValue = new ChangeColumnValue(creator, linker, env, utils);
  });

  it('should create ChangeColumnValue', () => {
    expect(changeColumnValue).toBeTruthy();
  });

  it('should have name property', () => {
    expect(changeColumnValue.name).toBe('change column value');
  });

  it('should have properties property', () => {
    expect(changeColumnValue.properties).toEqual({});
  });

  it('should have inputs property', () => {
    expect(changeColumnValue.inputs).toEqual({
      name: 'pathParams',
      fields: {
        taskIds: {
          from: 'taskIds',
        },
        groupColumnId: {
          state: 'column',
        },
        boardId: {
          state: 'boardId',
        },
        changedValue: {
          formatter: jasmine.any(Function),
        },
      },
    });
  });

  it('should have outputs property', () => {
    expect(changeColumnValue.outputs).toBe('outputVariable');
  });

  it('should have identifier property', () => {
    expect(ChangeColumnValue.identifier).toBe('ChangeColumnValue');
  });

  describe('getIdentifier', () => {
    it('should return the identifier', () => {
      const identifier = changeColumnValue.getIdentifier();
      expect(identifier).toBe('ChangeColumnValue');
    });
  });
});
