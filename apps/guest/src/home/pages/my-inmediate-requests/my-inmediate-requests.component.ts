import { Component, OnInit, OnDestroy } from '@angular/core';
import { InmediateRequestsService } from 'guest/services/inmediate-requests.service';
import { GeneralService } from 'guest/services/general.service';
import { Subscription } from 'rxjs';
import { Request } from 'lib/models/request';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-my-inmediate-requests',
  templateUrl: './my-inmediate-requests.component.html',
  styleUrls: ['./my-inmediate-requests.component.scss'],
})
export class MyInmediateRequestsComponent implements OnInit, OnDestroy {
  public PAGES = {
    PENDING: 'pending',
    READY: 'ready',
  };
  public currentPage = this.PAGES.PENDING;

  private inmediateRequestsSubscription: Subscription | null = null;
  public pendingRequests: Request[] = [];
  public readyRequests: Request[] = [];

  constructor(
    private inmediateRequestsService: InmediateRequestsService,
    public generalService: GeneralService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.inmediateRequestsSubscription = this.inmediateRequestsService
      .listenInmediateRequestByHotel()
      .subscribe((requests: Request[]) => {
        this.pendingRequests = requests.filter(request => !request.finished_at);
        this.readyRequests = requests.filter(request => !!request.finished_at);
      });
  }

  ngOnDestroy() {
    if (this.inmediateRequestsSubscription) {
      this.inmediateRequestsSubscription.unsubscribe();
    }
  }

  goToRequest(request: Request) {
    this.router.navigate(['/home', 'inmediate-request', request.uid]);
  }
}
