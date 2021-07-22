import { Component, OnInit } from '@angular/core';
import { AuthService } from '@contler/hotel/services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EcommerceEntity } from '@contler/entity/ecommerce.entity';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { EcommerceService } from '@contler/hotel/ecommerce/services/ecommerce.service';
import { MessagesService } from '@contler/hotel/services/messages/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss'],
})
export class EcommerceComponent implements OnInit {
  load = false;
  ecommerce$: Observable<EcommerceEntity[]>;

  constructor(
    private authService: AuthService,
    private ecommerceService: EcommerceService,
    private messagesService: MessagesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.ecommerce$ = this.authService.$hotel.pipe(map((hotel) => hotel.ecommerce));
  }

  changeStatus($event: MatSlideToggleChange, ecommerce: EcommerceEntity): void {
    ecommerce.status = $event.checked;
    const loader = this.messagesService.showLoader();
    this.ecommerceService.updateCommerce(ecommerce).subscribe(
      () => {
        this.messagesService.closeLoader(loader);
      },
      () => {
        this.messagesService.closeLoader(loader);
        this.messagesService.showServerError();
      },
    );
  }

  removeEcommerce(ecommerce: EcommerceEntity): void {}

  editEcommerce(ecommerce: EcommerceEntity): void {
    this.router.navigate(['preferences', 'ecommerce', ecommerce.id]);
  }

  goToGuestHome(): void {
    this.router.navigate(['preferences', 'guest-home']);
  }
}
