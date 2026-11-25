export interface FieldValueOption {
  text: string;
  value: string;
}

export interface FieldValue {
  valueInputType: string;
  values?: FieldValueOption[];
}

export interface FieldValuesMap {
  [key: string]: FieldValue;
}
