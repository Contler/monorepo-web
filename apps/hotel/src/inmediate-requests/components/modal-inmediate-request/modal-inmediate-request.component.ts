import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployerService } from 'hotel/employer/services/employer.service';
import { Subscription } from 'rxjs';
import { InmediateRequestsService } from 'hotel/inmediate-requests/services/inmediate-requests.service';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { SUB_CATEGORY_DRINKS } from '@contler/const';
import { EmployerEntity, RequestEntity } from '@contler/entity';

@Component({
  selector: 'contler-modal-inmediate-request',
  templateUrl: './modal-inmediate-request.component.html',
  styleUrls: ['./modal-inmediate-request.component.scss'],
})
export class ModalInmediateRequestComponent implements OnInit, OnDestroy {
  loading = false;

  public request: RequestEntity | null = null;

  public employers: EmployerEntity[] = [];
  private subscription: Subscription | null = null;
  public isFinished = false;

  public readonly DRINKS_SUBCATEGORY = SUB_CATEGORY_DRINKS;

  constructor(
    public dialogRef: MatDialogRef<ModalInmediateRequestComponent>,
    private employerService: EmployerService,
    private inmediateRequestsService: InmediateRequestsService,
    private messagesService: MessagesService,
    @Inject(MAT_DIALOG_DATA)
    public data: RequestEntity
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.request = this.data;
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
      const employerToFind: string = this.request.solved.name || '';
      const employerFound = this.employers.find(employer => employer.uid === employerToFind);
      if (employerFound) {
        this.request.solved.name = employerFound.uid;
        this.request.solved.name = `${employerFound.name} ${employerFound.lastName}`;
      }
      if (this.isFinished && !this.request.complete) {
        this.request.finishAt = new Date()
        this.request.complete = true;
      }
      this.inmediateRequestsService
        .updateRequest(this.request.id + '', this.request)
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
