import {ColumnOption} from './column-option.interface';
import {ConditionOption} from './conditions.interface';
import {FieldValueOption} from './field-value.interface';

export interface WorkflowState {
  columns: ColumnOption[];
  conditions: ConditionOption[];
  values: FieldValueOption[];
  properties: Map<string, unknown>;
}
