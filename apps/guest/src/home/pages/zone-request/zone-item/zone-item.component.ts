import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImmediateOptionLink, ImmediateOptionText, OptionModule, OptionType } from '@contler/models';

@Component({
  selector: 'contler-zone-item',
  templateUrl: './zone-item.component.html',
  styleUrls: ['./zone-item.component.scss'],
})
export class ZoneItemComponent {
  @Input() option: OptionModule;
  @Input() selectedOption: string;
  @Output() clickedOption: EventEmitter<string> = new EventEmitter<string>();

  public setQuickRequest(): void {
    let value = null;
    if (this.option.type === OptionType.TEXT) {
      const optionSelected: ImmediateOptionText = this.option as ImmediateOptionText;
      value = optionSelected.value;
    } else if (this.option.type === OptionType.LINK) {
      const optionSelected: ImmediateOptionLink = this.option as ImmediateOptionLink;
      value = optionSelected.link;
    }
    this.clickedOption.emit(value);
  }
}
