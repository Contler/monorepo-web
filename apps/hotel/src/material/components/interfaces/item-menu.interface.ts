import { ChildrenMenu } from './children-menu.interface';

export interface ItemMenu {
  name: string;
  icon: string;
  link: string[] | null;
  primary?: boolean;
  children: ChildrenMenu[] | null;
}
