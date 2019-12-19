import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestTimePipe } from './request-time.pipe';
import { ScoreLabelPipe } from './score-label.pipe';

@NgModule({
  declarations: [RequestTimePipe, ScoreLabelPipe],
  imports: [CommonModule],
  exports: [RequestTimePipe, ScoreLabelPipe],
})
export class PipesModule {}
