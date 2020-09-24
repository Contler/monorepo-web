import { Component } from '@angular/core';
import { OPTIONS_RECEPTION } from 'guest/reception/const/reception-options.const';

@Component({
  selector: 'contler-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss'],
})
export class ReceptionComponent {
  options = OPTIONS_RECEPTION;
}
