import { OptionInput } from '../interfaces/option-input';
import { InputType } from '../interfaces/input-field';

export const OPTION_INPUTS: OptionInput[] = [
  {
    name: 'preferences.optionInputs.text',
    value: InputType.TEXT,
  },
  {
    name: 'preferences.optionInputs.select',
    value: InputType.SELECT,
  },
  {
    name: 'preferences.optionInputs.calendar',
    value: InputType.DATE,
  },
];
