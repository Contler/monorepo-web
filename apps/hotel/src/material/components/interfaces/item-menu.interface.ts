import { ChildrenMenu } from './children-menu.interface';

export interface ItemMenu {
  name: string;
  icon: string;
  children: ChildrenMenu[];
}
