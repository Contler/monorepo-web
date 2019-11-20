import { ADMIN, EMPLOYER } from '../const/index';


export interface Claim {
  rol: typeof ADMIN | typeof EMPLOYER
}
