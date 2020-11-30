export interface SpecialZonesModel extends SpecialKey{
  wakeZone: ZoneData;
  lateZone: ZoneData;
  receptionZone: ZoneData;
  deliveryZone: ZoneData;
  cleanZone: ZoneData;
  maintainZone: ZoneData;
}

interface ZoneData {
  value: boolean,
  name: string
}

interface SpecialKey {
  [key: string]: ZoneData
}
