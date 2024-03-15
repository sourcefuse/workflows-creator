import {StateNode} from './state-node.class';

describe('StateNode', () => {
  let stateNode: StateNode<any>;

  beforeEach(() => {
    // Create a new StateNode instance before each test
    stateNode = new StateNode<any>({});
  });

  it('should have a state property', () => {
    expect(stateNode.state).toBeDefined();
  });

  it('should have a next property', () => {
    expect(stateNode.next).toBeUndefined();
  });

  it('should have a prev property', () => {
    expect(stateNode.prev).toBeUndefined();
  });

  it('should set and get next state correctly', () => {
    const nextStateNode = new StateNode<any>({});
    stateNode.next = nextStateNode;
    expect(stateNode.next).toBe(nextStateNode);
  });

  it('should set and get prev state correctly', () => {
    const prevStateNode = new StateNode<any>({});
    stateNode.prev = prevStateNode;
    expect(stateNode.prev).toBe(prevStateNode);
  });
});
