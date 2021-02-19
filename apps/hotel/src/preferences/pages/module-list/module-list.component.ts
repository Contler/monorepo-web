import { Component, OnInit } from '@angular/core';
import { AuthService } from 'hotel/services/auth.service';
import { first, map } from 'rxjs/operators';
import { SpecialZoneHotelEntity } from '@contler/entity/SpecialZoneHotel.entity';
import { HotelService } from '@contler/core';
import { HotelEntity } from '@contler/entity';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss'],
})
export class ModuleListComponent implements OnInit {
  public hotel: HotelEntity = null;
  constructor(
    private authService: AuthService,
    private hotelService: HotelService,
    private messageService: MessagesService,
    private router: Router,
  ) {}

  public async ngOnInit(): Promise<void> {
    const loader = this.messageService.showLoader();
    try {
      await this.loadInitialData();
      this.messageService.closeLoader(loader);
    } catch (err) {
      this.messageService.closeLoader(loader);
      this.messageService.showServerError();
      console.log('Error loading initial data', err);
    }
  }

  private async loadInitialData(): Promise<void> {
    this.hotel = await this.authService.$employer
      .pipe(
        map((employer) => employer.hotel),
        first(),
      )
      .toPromise();
  }

  public async updateModule(module: SpecialZoneHotelEntity): Promise<void> {
    const loader = this.messageService.showLoader();
    this.hotel.specialZones = this.hotel.specialZones.map((m) => (m.id === module.id ? module : m));
    try {
      await this.hotelService.updateHotel(this.hotel).toPromise();
      this.messageService.closeLoader(loader);
    } catch (err) {
      this.messageService.closeLoader(loader);
      this.messageService.showServerError();
      console.error('Error updating hotel: ', err);
    }
  }

  public goToImmediateRequestPage(): void {
    this.router.navigate(['preferences', 'immediate-request']);
  }
}
