export const ADMIN = 'admin';
export const EMPLOYER = 'employer';
export const LEADER = 'leader';
export const CHIEF = 'chief';
export const GUEST = 'guest';
export const SUPER_ADMIN = 'super-admin';

export type Roles =
  | typeof ADMIN
  | typeof EMPLOYER
  | typeof LEADER
  | typeof CHIEF
  | typeof GUEST
  | typeof SUPER_ADMIN;
