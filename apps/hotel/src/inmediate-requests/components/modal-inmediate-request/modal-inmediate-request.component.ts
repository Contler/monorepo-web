import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployerService } from 'hotel/employer/services/employer.service';
import { Employer } from '@contler/core/models';
import { Subscription } from 'rxjs';
import { Request } from 'lib/models';
import { InmediateRequestsService } from 'hotel/inmediate-requests/services/inmediate-requests.service';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { SUB_CATEGORY_DRINKS } from '@contler/core/const';

@Component({
  selector: 'contler-modal-inmediate-request',
  templateUrl: './modal-inmediate-request.component.html',
  styleUrls: ['./modal-inmediate-request.component.scss'],
})
export class ModalInmediateRequestComponent implements OnInit, OnDestroy {
  loading = false;

  public request: Request | null = null;

  public employers: Employer[] = [];
  private subscription: Subscription | null = null;
  public isFinished: boolean = false;

  public readonly DRINKS_SUBCATEGORY = SUB_CATEGORY_DRINKS;

  constructor(
    public dialogRef: MatDialogRef<ModalInmediateRequestComponent>,
    private employerService: EmployerService,
    private inmediateRequestsService: InmediateRequestsService,
    private messagesService: MessagesService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      request: Request;
    },
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.request = this.data.request;
    this.isFinished = this.request.complete;
    this.subscription = this.employerService.getEmployers().subscribe(employers => (this.employers = employers));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  save() {
    if (this.request) {
      this.loading = true;
      const employerToFind: string = this.request.employer || '';
      const employerFound = this.employers.find(employer => employer.uid == employerToFind);
      if (employerFound) {
        this.request.employer = employerFound.uid;
        this.request.employerName = `${employerFound.name} ${employerFound.lastName}`;
      }
      if (this.isFinished && !this.request.complete) {
        this.request.finished_at = new Date().getTime();
        this.request.complete = true;
      }
      this.inmediateRequestsService
        .updateRequest(this.request.uid, this.request)
        .then(() => {
          this.loading = false;
          this.messagesService.showToastMessage('Solicitud actualizada exitosamente');
          this.dialogRef.close();
        })
        .catch(() => {
          this.loading = false;
          //this.dialogRef.close();
          this.messagesService.showServerError();
          console.error('Hubo un error');
        });
    }
  }
}
