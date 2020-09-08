import { Component, ContentChild, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';
import { ViewModeDirective } from './view-mode.directive';
import { EditModeDirective } from './edit-mode.directive';
import { fromEvent, Subject } from 'rxjs';
import { filter, take, switchMapTo } from 'rxjs/operators';

@Component({
  selector: 'contler-editable',
  template: ` <ng-container *ngTemplateOutlet="currentView"></ng-container> `,
  styleUrls: [],
})
export class EditableComponent implements OnInit {
  @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;
  @Output() update = new EventEmitter();

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  mode: 'view' | 'edit' = 'view';

  constructor(private host: ElementRef) {}

  ngOnInit() {
    this.viewModeHandler();
    this.editModeHandler();
  }

  toViewMode() {
    this.update.next();
    this.mode = 'view';
  }

  private get element() {
    return this.host.nativeElement;
  }

  viewModeHandler() {
    fromEvent(this.element, 'click').subscribe(() => {
      this.mode = 'edit';
      this.editMode.next(true);
    });
  }

  editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => this.element.contains(target) === false),
    );

    this.editMode$.pipe(switchMapTo(clickOutside$)).subscribe((event) => this.toViewMode());
  }

  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }
}
