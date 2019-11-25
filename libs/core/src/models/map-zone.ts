import { Zone } from 'lib/models/zone';

export interface MapZone {
  [key: string]: ZoneCategory
}

export interface ZoneCategory {
  zone: Zone,
  subZones: Zone[]
}
