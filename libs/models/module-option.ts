export enum OptionType {
  TEXT,
  LINK,
  OTHER,
}

export interface OptionModule {
  type: OptionType;
  text: string;
  icon?: string;
  active: boolean;
}

export interface ImmediateOptionText extends OptionModule {
  type: OptionType.TEXT;
  value: string;
}

export interface ImmediateOptionLink extends OptionModule {
  type: OptionType.LINK;
  link: string;
}
