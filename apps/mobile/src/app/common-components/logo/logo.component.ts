import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @Input() src: string;

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/home']);
  }
}
