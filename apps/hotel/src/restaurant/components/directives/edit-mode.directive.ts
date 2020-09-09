import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[contlerEditMode]',
})
export class EditModeDirective {
  constructor(public tpl: TemplateRef<any>) {}
}
