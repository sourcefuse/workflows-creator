export interface ConditionOption {
  text: string;
  value: string;
}

export interface ConditionsMap {
  [key: string]: ConditionOption[];
}
