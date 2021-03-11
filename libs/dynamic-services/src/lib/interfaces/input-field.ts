export enum InputType {
  TEXT,
  DATE,
  SELECT,
  SELECT_WITH_OTHER,
}

export interface InputField {
  description: string;
  type: InputType;
  value?: string | Date;
  option?: string[];
}
