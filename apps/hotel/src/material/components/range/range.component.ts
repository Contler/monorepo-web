import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DAYS } from '@contler/const';
import { ScheduleEntity } from '@contler/entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'contler-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
})
export class RangeComponent implements OnInit {
  @Input() schedule: ScheduleEntity | undefined;
  @Input() formGroup!: FormGroup;
  @Output() delete = new EventEmitter<void>();

  days = DAYS;
  time = new Array(48);
  rangeForm: FormGroup;
  private id: string;

  constructor(private formBuild: FormBuilder) {
    this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.rangeForm = this.formBuild.group({
      day: ['', Validators.required],
      init: ['', Validators.required],
      end: ['', Validators.required],
      quota: ['', Validators.required],
      active: [false, Validators.required],
      rooms: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.formGroup.addControl(this.id, this.rangeForm);
    this.rangeForm.get('rooms').setValue(this.schedule.rooms);
    this.dayForm.setValue(this.schedule!.day);
    this.initForm.setValue(this.schedule!.timeInit);
    this.endForm.setValue(this.schedule!.timeFinish);
    this.quotaForm.setValue(this.schedule!.quota);
    this.activeForm.setValue(this.schedule!.active);

    this.dayForm.valueChanges.subscribe((data) => (this.schedule!.day = data));
    this.initForm.valueChanges.subscribe((data) => (this.schedule!.timeInit = data));
    this.endForm.valueChanges.subscribe((data) => (this.schedule!.timeFinish = data));
    this.quotaForm.valueChanges.subscribe((data) => (this.schedule!.quota = data));
    this.activeForm.valueChanges.subscribe((data) => (this.schedule!.active = data));
  }

  getHour(index: number) {
    const extraTime = 30 * index * 60 * 1000;
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return new Date(date.getTime() + extraTime);
  }

  deleteRange() {
    this.formGroup.removeControl(this.id);
    this.delete.emit();
  }

  compareWith(o1: Date, o2: Date) {
    return !!o1 && !!o2 && o1.getHours() === o2.getHours() && o1.getMinutes() === o2.getMinutes();
  }
  get activeToggle() {
    return this.rangeForm.get('active')!;
  }
  get dayForm() {
    return this.rangeForm.get('day')!;
  }

  get initForm() {
    return this.rangeForm.get('init')!;
  }

  get endForm() {
    return this.rangeForm.get('end')!;
  }

  get quotaForm() {
    return this.rangeForm.get('quota')!;
  }

  get activeForm() {
    return this.rangeForm.get('active')!;
  }
}
