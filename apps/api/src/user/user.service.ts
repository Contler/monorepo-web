import { Injectable } from '@nestjs/common';
import { auth, firestore, database } from 'firebase-admin';
import { Admin, AdminRequest, Claim, Hotel } from '@contler/core/models';
import { ADMIN } from '@contler/core/const';



@Injectable()
export class UserService {
  async createAdmin(data: AdminRequest) {
    const user = await auth().createUser({
      email: data.email,
      password: data.password,
      displayName: data.name,
    });
    auth().setCustomUserClaims(user.uid, { rol: ADMIN } as Claim);
    const hotel = new Hotel();
    hotel.name = data.hotelName;
    hotel.logo = data.hotelLogo;
    hotel.uid = database()
      .ref()
      .push().key;
    firestore()
      .doc(`${Hotel.REF}/${hotel.uid}`)
      .set(hotel.serialize());
    const admin = new Admin();
    admin.hotel = hotel.uid;
    admin.uid = user.uid;
    admin.name = data.name;
    return firestore()
      .doc(`${Admin.REF}/${admin.uid}`)
      .set(admin.serialize());
  }
}
