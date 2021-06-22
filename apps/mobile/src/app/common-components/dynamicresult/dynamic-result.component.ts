import { Component, Input, OnInit } from '@angular/core';
import { DynamicRequest, DynamicRequestStatus, MODULES, RequestService } from '@contler/dynamic-services';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { EmployerService } from '../../services/employer.service';
import { map } from 'rxjs/operators';
import { EmployerEntity } from '@contler/entity';

@Component({
  selector: 'contler-dynamicresult',
  templateUrl: './dynamic-result.component.html',
  styleUrls: ['./dynamic-result.component.scss'],
})
export class DynamicResultComponent implements OnInit {
  @Input() data: DynamicRequest;
  status: DynamicRequestStatus;
  load = false;

  listStatus = [
    DynamicRequestStatus.PROGRAMING,
    DynamicRequestStatus.ATTENDED,
    DynamicRequestStatus.COMPLETED,
  ];
  employerId: string | undefined;
  employers: EmployerEntity[];

  constructor(
    private db: AngularFirestore,
    private modalController: ModalController,
    private employerService: EmployerService,
    private requestService: RequestService,
  ) {}

  ngOnInit(): void {
    this.status = this.data.status;
    this.employerId = this.data?.assigned?.uid;
    this.employerService
      .getEmployers()
      .pipe(
        map((employers) =>
          employers.filter((employer) => {
            if (this.data.service === MODULES.room) {
              return (
                employer.leaderZones.find((le) => le.category.id === 3) ||
                employer.leaderSpecialZone.find((zone) => zone.zone.module === this.data.service)
              );
            }
            return employer.leaderSpecialZone.find((zone) => zone.zone.module === this.data.service);
          }),
        ),
      )
      .subscribe((employers) => (this.employers = employers));
  }

  update() {
    this.load = true;
    const employer = this.employers.find(({ uid }) => uid === this.employerId);
    this.requestService.changeStatus(this.data.key, this.status, employer).then(() => {
      this.load = false;
      this.closeModal();
    });
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
