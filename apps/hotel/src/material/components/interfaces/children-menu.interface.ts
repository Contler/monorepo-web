export interface ChildrenMenu {
  name: string;
  icon: string;
  link: string[] | null;
  outlined?: boolean;
  primary?: boolean;
  children?: ChildrenMenu[];
  show?: boolean;
}
