import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { auth, firestore } from 'firebase-admin';
import { Admin, AdminRequest, Claim, Employer, EmployerRequest, User } from '@contler/core/models';
import { ADMIN, Roles } from '@contler/core/const';
import { HotelService } from 'api/hotel/hotel.service';

@Injectable()
export class UserService {
  constructor(private hotelService: HotelService) {}

  async createAdmin(data: AdminRequest) {
    const user = await this.createUser(data.email, data.password, data.name, ADMIN);
    const hotel = this.hotelService.createHotel(data.hotelName, data.hotelLogo);
    const admin = new Admin();
    admin.hotel = hotel.uid;
    admin.uid = user.uid;
    admin.name = data.name;
    return this.saveUser(admin);
  }

  async createEmployer(data: EmployerRequest) {
    const user = await this.createUser(data.email, data.password, data.name, data.rol);
    const employer = new Employer(data.rol);
    employer.uid = user.uid;
    employer.name = data.name;
    employer.lastName = data.lastName;
    employer.hotel = data.idHotel;
    return this.saveUser(employer);
  }

  private saveUser(user: User) {
    return firestore()
      .doc(`${User.REF}/${user.uid}`)
      .set(user.serialize());
  }

  private async createUser(email: string, password: string, name: string, rol: Roles) {
    try {
      const user = await auth().createUser({
        email,
        password,
        displayName: name,
      });
      auth().setCustomUserClaims(user.uid, { rol } as Claim);
      return user;
    } catch (e) {
      const {errorInfo} = e;
      throw new HttpException(errorInfo.message, HttpStatus.BAD_REQUEST)
    }

  }
}
