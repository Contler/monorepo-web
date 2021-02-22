import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpecialZoneHotelEntity } from '@contler/entity';

@Component({
  selector: 'contler-module-card',
  templateUrl: './module-card.component.html',
  styleUrls: ['./module-card.component.scss'],
})
export class ModuleCardComponent {
  public check = true;
  @Input() module: SpecialZoneHotelEntity;
  @Output() enableModule: EventEmitter<SpecialZoneHotelEntity> = new EventEmitter<SpecialZoneHotelEntity>(
    null,
  );

  public toggleModule(): void {
    this.module.status = !this.module.status;
    this.enableModule.emit(this.module);
  }
}
