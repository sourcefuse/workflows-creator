export interface WorkflowElementState {
  change(key: string, value: unknown): void;
  get(key: string): unknown;
}

export interface WorkflowElementBase {
  getIdentifier(): string;
  state: WorkflowElementState;
}

export interface WorkflowEvent {
  event?: WorkflowElementBase;
  action?: WorkflowElementBase;
  field?: string;
  value?: unknown;
  item?: WorkflowElementBase;
}
