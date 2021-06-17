import { EmployerEntity, GuestEntity, HotelEntity } from '@contler/entity';
import { MODULES } from '../constants/modules-references';
import { DynamicRequestStatus } from '../constants/dynamic-request-status';
import { TypeRequest } from '../constants/typeRequest';

export interface AbstractRequest {
  key?: string;
  service: MODULES;
  active: boolean;
  status: DynamicRequestStatus;
  createAt: Date;
  completeAt?: Date;
  typeRequest: TypeRequest;

  guestId: string;
  guest?: GuestEntity;

  hotelId: string;
  hotel?: HotelEntity;

  assignedId?: string;
  assigned?: EmployerEntity;
}
