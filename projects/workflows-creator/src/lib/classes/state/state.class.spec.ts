import {State} from './state.class';

describe('State', () => {
  let state: State<any>;

  beforeEach(() => {
    // Create a new State instance before each test to ensure a clean state
    state = new State<any>();
  });

  it('should have a current state', () => {
    expect(state.get('someKey')).toBeUndefined();
  });

  it('should change state correctly', () => {
    state.change('someKey', 'someValue');
    expect(state.get('someKey')).toBe('someValue');
  });

  it('should remove state correctly', () => {
    state.change('someKey', 'someValue');
    state.remove('someKey');
    expect(state.get('someKey')).toBeUndefined();
  });

  it('should restore state correctly', () => {
    state.change('someKey', 'someValue');
    state.change('anotherKey', 'anotherValue');

    const map = {
      someKey: 'restoredValue',
      anotherKey: 'anotherValue',
    };

    state.restore(map);
    expect(state.get('someKey')).toBe('restoredValue');
  });

  it('should undo and redo correctly', () => {
    state.change('someKey', 'someValue');
    state.undo();
    expect(state.get('someKey')).toBeUndefined();
    state.redo();
    expect(state.get('someKey')).toBe('someValue');
  });

  it('should get all keys and values correctly', () => {
    state.change('key1', 'value1');
    state.change('key2', 'value2');
    expect(state.getAll()).toEqual({key1: 'value1', key2: 'value2'});
    expect(state.getAll(['key1'])).toEqual({key1: 'value1'});
  });
});
