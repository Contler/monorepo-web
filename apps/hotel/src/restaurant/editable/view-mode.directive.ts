import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[contlerViewMode]',
})
export class ViewModeDirective {
  constructor(public tpl: TemplateRef<any>) {}
}
