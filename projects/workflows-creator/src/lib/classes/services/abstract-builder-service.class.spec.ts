import {Statement} from '../statement/statement.class';
import {AbstractBaseGroup} from '../nodes';
import {BuilderService} from './abstract-builder-service.class';
import {RecordOfAnyType} from '../../types';

class MockBuilderService<E, S extends RecordOfAnyType> extends BuilderService<
  E,
  S
> {
  async build(
    statement: Statement<E>,
    elseStatement: Statement<E>,
  ): Promise<string> {
    // Mock implementation for build method
    return 'mocked build result';
  }

  async restore(model: string): Promise<{
    actions: any[];
    elseActions: any[];
    events: any[];
    groups: AbstractBaseGroup<E>[];
    state: any;
    process: any;
  }> {
    // Mock implementation for restore method
    return {
      actions: [],
      elseActions: [],
      events: [],
      groups: [],
      state: {},
      process: {id: 'mocked-id'},
    };
  }
}

describe('BuilderService', () => {
  let builderService: BuilderService<any, any>;

  beforeEach(() => {
    builderService = new MockBuilderService();
  });

  it('should build and return a string', async () => {
    const statement: Statement<any> = {} as any;
    const elseStatement: Statement<any> = {} as any;

    const result = await builderService.build(statement, elseStatement);

    expect(typeof result).toBe('string');
  });

  it('should restore and return the expected structure', async () => {
    const restoredModel = await builderService.restore('mocked-model');
    expect(restoredModel.actions).toBeDefined();
    expect(restoredModel.elseActions).toBeDefined();
    expect(restoredModel.events).toBeDefined();
    expect(restoredModel.groups).toBeDefined();
    expect(restoredModel.state).toBeDefined();
    expect(restoredModel.process).toBeDefined();
    expect(restoredModel.process.id).toBe('mocked-id');
  });
});
