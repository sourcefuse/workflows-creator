import {Statement} from './statement.class';

describe('Statement', () => {
  let statement: Statement<any>;
  let mockState: any;

  beforeEach(() => {
    // Mock state object
    mockState = {};

    // Create a new Statement instance before each test
    statement = new Statement(mockState);
  });

  it('should initialize head, tail, and state properties correctly', () => {
    expect(statement.head).toEqual([]);
    expect(statement.tail).toEqual([]);
    expect(statement.state).toBe(mockState);
  });

  it('should set and get the processId property correctly', () => {
    statement.processId = 'testId';
    expect(statement.processId).toBe('testId');
  });

  // Add more test cases as needed for other methods
});
