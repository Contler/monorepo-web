import { InputField } from './input-field';
import { GuestEntity } from '@contler/entity';
import { MODULES } from '../constants/modules-references';
import { DynamicRequestStatus } from '../constants/dynamic-request-status';

export interface DynamicRequest {
  form: InputField[];
  guest?: GuestEntity;
  guestId: string;
  hotelId: string;
  nameService: string;
  service: MODULES;
  key?: string;
  active: boolean;
  status: DynamicRequestStatus;
  createAt: string | Date;
}
