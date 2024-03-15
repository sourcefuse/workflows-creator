import {
  CreateStrategy,
  ModdleElement,
  LinkStrategy,
  ENV,
} from 'projects/workflows-creator/src/public-api';
import {UtilsService} from '../../../utils.service';
import {ReadColumnValue} from './read-column.task';

describe('ReadColumnValue', () => {
  let readColumnValue: ReadColumnValue;
  let creator: CreateStrategy<ModdleElement>;
  let linker: LinkStrategy<ModdleElement>;
  let env: ENV;
  let utils: UtilsService;

  beforeEach(() => {
    creator = jasmine.createSpyObj('CreateStrategy', ['create']);
    linker = jasmine.createSpyObj('LinkStrategy', ['link']);
    env = {envIdentifier: 'test'};
    utils = jasmine.createSpyObj('UtilsService', ['']);

    readColumnValue = new ReadColumnValue(creator, linker, env, utils);
  });

  it('should create an instance of ReadColumnValue', () => {
    expect(readColumnValue).toBeTruthy();
  });

  it('should have the correct name', () => {
    expect(readColumnValue.name).toEqual('read column value');
  });

  it('should have the correct outputs', () => {
    expect(readColumnValue.outputs).toEqual('outputVariable');
  });

  it('should have the correct inputs', () => {
    expect(readColumnValue.inputs).toEqual({
      name: 'pathParams',
      fields: {
        taskIds: {
          from: 'taskIds',
        },
        groupColumnId: {
          state: 'column',
        },
      },
    });
  });

  it('should have the correct identifier', () => {
    expect(readColumnValue.getIdentifier()).toEqual('ReadColumnValue');
  });
});
