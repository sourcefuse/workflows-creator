import {Statement} from '../statement/statement.class';
import {AbstractBaseGroup} from '../nodes';
import {BuilderService} from './abstract-builder-service.class';
import {RecordOfAnyType} from '../../types';

// Mock implementation of BuilderService for testing
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
    // Create an instance of the BuilderService with the mock implementation
    builderService = new MockBuilderService();
  });

  it('should build and return a string', async () => {
    // Create dummy statements
    const statement: Statement<any> = {} as any;
    const elseStatement: Statement<any> = {} as any;

    // Call the build method
    const result = await builderService.build(statement, elseStatement);

    // Check if the result is a string
    expect(typeof result).toBe('string');
  });

  it('should restore and return the expected structure', async () => {
    // Call the restore method
    const restoredModel = await builderService.restore('mocked-model');

    // Check if the returned object has the expected properties
    expect(restoredModel.actions).toBeDefined();
    expect(restoredModel.elseActions).toBeDefined();
    expect(restoredModel.events).toBeDefined();
    expect(restoredModel.groups).toBeDefined();
    expect(restoredModel.state).toBeDefined();
    expect(restoredModel.process).toBeDefined();
    expect(restoredModel.process.id).toBe('mocked-id');
  });
});
