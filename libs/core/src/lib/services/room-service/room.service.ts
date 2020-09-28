import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { maintenanceConverted, MaintenanceModel } from '@contler/models';

@Injectable()
export class RoomService {
  constructor(private afs: AngularFirestore) {}

  createMaintenance(maintenance: MaintenanceModel) {
    const maintenanceDoc = this.maintenanceRef.doc();
    return maintenanceDoc.set({ ...maintenance, uid: maintenanceDoc.id });
  }

  private get maintenanceRef() {
    return this.afs.firestore.collection('maintenance').withConverter(maintenanceConverted);
  }
}
