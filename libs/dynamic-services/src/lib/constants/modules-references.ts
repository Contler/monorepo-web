export enum MODULES {
  root = 'modules',
  immediate = 'immediate',
  special = 'special',
  reception = 'reception',
  room = 'room',
  maintenance = 'maintenance',
  cleaning = 'cleaning',
  form = 'form',
}

export const NAME_MODULES = {
  [MODULES.reception]: 'modules.reception',
  [MODULES.room]: 'modules.room',
  [MODULES.maintenance]: 'modules.maintenance',
  [MODULES.cleaning]: 'modules.clean',
  [MODULES.immediate]: 'myRequest.immediateRequest',
  [MODULES.special]: 'myRequest.specialRequest',
};
