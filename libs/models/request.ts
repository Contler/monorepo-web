import { classToPlain, Transform } from 'class-transformer';

export class Request {
  static readonly REF = 'request';
  uid: string;
  hotel: string;
  user: string;
  userName: string;
  zone: string;
  zoneName: string;
  message: string;
  created_at: number;
  finished_at: number | null;
  employer: string | null;
  employerName: string | null;
  @Transform(value => value || null, { toClassOnly: true })
  score: number | undefined;
  @Transform(value => value || false, { toClassOnly: true })
  complete = false;
  scoreComments: string | undefined;
  room: string | undefined;
  drinkData: {
    typeKey: string | null;
    typeName: string | null;
    drinkKey: string | null;
    drinkName: string | null;
    units: number | null;
  } | null;

  constructor(
    uid: string,
    hotel: string,
    user: string,
    userName: string,
    zone: string,
    zoneName: string,
    message: string,
  ) {
    this.uid = uid;
    this.hotel = hotel;
    this.user = user;
    this.userName = userName;
    this.zone = zone;
    this.zoneName = zoneName;
    this.message = message;
    this.created_at = new Date().getTime();
    this.finished_at = null;
    this.employer = null;
    this.employerName = null;
    this.drinkData = {
      typeKey: null,
      typeName: null,
      drinkKey: null,
      drinkName: null,
      units: null,
    };
  }

  serialize() {
    return classToPlain(this);
  }
}
