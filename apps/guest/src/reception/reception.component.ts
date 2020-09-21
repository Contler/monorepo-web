import { Component } from '@angular/core';

@Component({
  selector: 'contler-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss'],
})
export class ReceptionComponent {
  options = [
    {
      name: 'Transportation',
      icon: 'fas fa-taxi',
    },
    {
      name: 'Cash loan',
      icon: 'fas fa-dollar-sign',
    },
    {
      name: 'Curency exchange',
      icon: 'fas fa-globe',
    },
    {
      name: 'Concierge',
      icon: 'fas fa-map-marker-alt',
    },
  ];
}
