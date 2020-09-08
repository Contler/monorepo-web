import { Component, Inject, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { MessagesService } from '../../services/messages/messages.service';
import { GeneralService } from '../../services/general.service';
import { EmployerService } from '../../services/employer.service';
import { InmediateRequestsService } from '../../services/inmediate-requests.service';
import { EmployerEntity, RequestEntity } from '@contler/entity';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'contler-modal-inmediate-request',
  templateUrl: './modal-inmediate-request.page.html',
  styleUrls: ['./modal-inmediate-request.page.scss'],
})
export class ModalInmediateRequestPage implements OnInit {
  public request: RequestEntity | undefined;

  public employers: EmployerEntity[] = [];
  idSelected: string | null = null;
  public isFinished = false;

  constructor(
    public generalService: GeneralService,
    private employerService: EmployerService,
    private inmediateRequestsService: InmediateRequestsService,
    private messagesService: MessagesService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ModalInmediateRequestPage>,
    @Inject(MAT_DIALOG_DATA) public data: RequestEntity,
  ) {
    this.request = data;
  }

  ngOnInit() {
    this.idSelected = this.request!.solved ? this.request!.solved.uid : null;
    this.isFinished = this.request!.complete;
    this.employerService.getEmployers().subscribe((employers) => (this.employers = employers));
  }

  save() {
    const loader = this.messagesService.showLoader();
    this.request!.solved = this.employers.find((e) => e.uid === this.idSelected)!;
    this.authService.$user
      .pipe(
        switchMap((user) => {
          this.request!.attended = user!;
          this.request!.complete = this.isFinished;
          return this.inmediateRequestsService.updateRequest(this.request!);
        }),
      )
      .subscribe(
        () => {
          this.messagesService.closeLoader(loader);
          this.messagesService.showToastMessage('Solicitud modificada exitosamente');
          this.dialogRef.close();
        },
        (err) => {
          this.messagesService.closeLoader(loader);
          this.messagesService.showServerError();
          console.error(err);
        },
      );
  }
}
