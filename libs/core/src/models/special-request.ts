export class SpecialRequest {
  static readonly REF = 'special-requests';
  uid: string | null;
  hotel: string | null;
  room: string | null;
  roomName: string | null;
  user: string | null;
  userName: string | null;
  checkIn: Date | null;
  checkOut: Date | null;
  description: string | null;
  isActive: boolean;
  employer: string | null;
  employerName: string | null;

  constructor() {
    this.uid = null;
    this.hotel = null;
    this.room = null;
    this.roomName = null;
    this.user = null;
    this.userName = null;
    this.checkIn = null;
    this.checkOut = null;
    this.description = null;
    this.isActive = true;
    this.employer = null;
    this.employerName = null;
  }
}
