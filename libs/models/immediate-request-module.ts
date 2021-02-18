export interface ImmediateRequestModule {
  categories: { [key: string]: ImmediateCategory };
}

export interface ImmediateCategory {
  name: string;
  id: string;
  options: OptionModule[];
}

export interface OptionModule {
  type: OptionType;
  text: string;
  icon: string;
  active: boolean;
}

export enum OptionType {
  TEXT,
  LINK,
  OTHER,
}

export interface ImmediateOptionText extends OptionModule {
  type: OptionType.TEXT;
  value: string;
}

export interface ImmediateOptionLink extends OptionModule {
  type: OptionType.LINK;
  link: string;
}
