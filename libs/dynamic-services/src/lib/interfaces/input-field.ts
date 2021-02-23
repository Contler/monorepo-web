export enum InputType {
  TEXT,
  DATE,
  SELECT,
}

export interface InputField {
  description: string;
  type: InputType;
  option?: string[];
}
