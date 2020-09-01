import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'contler-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  @Input() score: number | null = null;
  @Output() value: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onRate(data: any) {
    this.score = data.newValue;
    this.value.emit(this.score as number);
  }
}
