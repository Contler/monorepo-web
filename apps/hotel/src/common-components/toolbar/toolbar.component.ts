import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() toggle: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit() {}

  emitToggle() {
    this.toggle.emit();
  }

  goToHome() {
    this.router.navigate(['/home', 'admin']);
  }
}
