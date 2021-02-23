import { OptionModule } from './module-option';

export interface ImmediateRequestModule {
  categories: { [key: string]: ImmediateCategory };
}

export interface ImmediateCategory {
  name: string;
  id: string;
  options: OptionModule[];
}
