import { Component, Input, OnInit } from '@angular/core';
import { ModuleData } from '../../interfaces/module-data';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HotelEntity } from '@contler/entity';
import { AuthService } from '../../../services/auth.service';
import { InputField } from '@contler/dynamic-services';

@Component({
  selector: 'contler-new-service-wrap',
  templateUrl: './new-service-wrap.component.html',
  styleUrls: ['./new-service-wrap.component.scss'],
})
export class NewServiceWrapComponent implements OnInit {
  @Input() data: ModuleData;

  optionName: string;
  optionTitle: string;
  $hotel: Observable<HotelEntity>;

  listOption: InputField[] = [];

  constructor(private afAuth: AuthService) {
    this.$hotel = this.afAuth.$employer.pipe(
      take(1),
      map((user) => user.hotel),
    );
  }

  addOption() {
    this.listOption.push({
      description: null,
      type: null,
    });
  }

  ngOnInit(): void {}

  deleteInput(i: number) {
    this.listOption = this.listOption.filter((value, index) => index !== i);
  }
}
