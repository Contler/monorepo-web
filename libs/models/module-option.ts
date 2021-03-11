export enum OptionType {
  TEXT,
  LINK,
  OTHER,
  DYNAMIC_FORM,
}

export interface OptionModule {
  type: OptionType;
  text: string;
  icon?: string;
  active: boolean;
  formKey?: string;
}

export interface ImmediateOptionText extends OptionModule {
  type: OptionType.TEXT;
  value: string;
}

export interface ImmediateOptionLink extends OptionModule {
  type: OptionType.LINK;
  link: string;
}
export interface ImmediateOptionDynamicForm extends OptionModule {
  type: OptionType.DYNAMIC_FORM;
  link: string;
}
