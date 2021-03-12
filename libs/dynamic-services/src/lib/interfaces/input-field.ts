import { MoneyInput } from './money-interface';
import { MoneyValue } from '../components/money/money.component';

export enum InputType {
  TEXT,
  DATE,
  SELECT,
  SELECT_WITH_OTHER,
  MONEY,
  TIME,
}

export interface InputField {
  description: string;
  type: InputType;
  value?: string | Date | MoneyValue;
  option?: string[];
  money?: MoneyInput;
}
