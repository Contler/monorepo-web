import { SpecialZoneHotelEntity } from "./SpecialZoneHotel.entity";

export class SpecialZoneEntity {
  id!: number;

  name: string;

  text: string;

  hotelSpecialZone: SpecialZoneHotelEntity[];
}
