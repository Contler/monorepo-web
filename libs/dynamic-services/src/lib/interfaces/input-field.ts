export enum InputType {
  TEXT,
  DATE,
  SELECT,
}

export interface InputField {
  description: string;
  type: InputType;
  value?: string | Date;
  option?: string[];
}
