import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[contlerButton]',
})
export class ButtonDirective implements OnChanges {
  @Input() loading = false;

  private content: string | undefined = undefined;

  constructor(private el: ElementRef<HTMLButtonElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.loading) {
      this.content = this.el.nativeElement.innerHTML;
      this.el.nativeElement.innerHTML = '';
      this.el.nativeElement.classList.add('cnt-loading');
    } else if (!!this.content) {
      this.el.nativeElement.innerHTML = this.content;
      this.content = undefined;
      this.el.nativeElement.classList.remove('cnt-loading');
    }
  }
}
