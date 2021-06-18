import { EmployerEntity, GuestEntity, HotelEntity, ZoneEntity } from '@contler/entity';
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
  score?: number;
  comment?: string;

  guestId: string;
  guest?: GuestEntity;

  hotelId: string;
  hotel?: HotelEntity;

  assignedId?: string;
  assigned?: EmployerEntity;

  zoneId?: string;
  zone?: ZoneEntity;
}
