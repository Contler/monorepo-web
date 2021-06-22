import { MODULES } from '../constants/modules-references';
import { GuestEntity, HotelEntity, ZoneEntity } from '@contler/entity';
import { InputField } from './input-field';

export interface RequestData {
  service: MODULES;
  guest: GuestEntity;
  hotel: HotelEntity;
  zone?: ZoneEntity;
}

export interface RequestFormData extends RequestData {
  form: InputField[];
  nameService: string;
  serviceId: string;
}

export interface RequestMessageData extends RequestData {
  message: string;
}
