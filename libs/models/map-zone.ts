import { Zone } from '.';

export interface MapZone {
  [key: string]: ZoneCategory
}

export interface ZoneCategory {
  zone: Zone,
  subZones: Zone[]
}
