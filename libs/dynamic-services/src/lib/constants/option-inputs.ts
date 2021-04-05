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
    name: 'preferences.optionInputs.select-other',
    value: InputType.SELECT_WITH_OTHER,
  },
  {
    name: 'preferences.optionInputs.calendar',
    value: InputType.DATE,
  },
  {
    name: 'preferences.optionInputs.money',
    value: InputType.MONEY,
  },
  {
    name: 'preferences.optionInputs.hour',
    value: InputType.TIME,
  },
  {
    name: 'preferences.optionInputs.url',
    value: InputType.URL,
  },
];
