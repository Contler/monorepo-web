import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { auth, database, firestore } from 'firebase-admin';
import { Admin, AdminRequest, Claim, Employer, EmployerRequest, User, Zone } from '@contler/models';
import { ADMIN, Roles } from '@contler/const';
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
    employer.leaderZone = data.leaderZone;
    await this.saveUser(employer);
    return employer;
  }

  async deleteUser(uid: string) {
    try {
      firestore()
        .collection(User.REF)
        .doc(uid)
        .delete();
      await auth().deleteUser(uid);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  private saveUser(user: User) {
    Object.keys(user.leaderZone).forEach(key =>
      database()
        .ref(`${Zone.REF}/${key}`)
        .child('userLeader')
        .child(user.uid!)
        .set(true),
    );
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
      const { errorInfo } = e;
      throw new HttpException(errorInfo.message, HttpStatus.BAD_REQUEST);
    }
  }
}
