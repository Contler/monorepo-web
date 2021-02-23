import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImmediateOptionLink, ImmediateOptionText, OptionModule, OptionType } from '@contler/models';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss'],
})
export class RoomItemComponent {
  @Input() option: OptionModule;
  @Input() selectedOption: string;
  @Output() clickedOption: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) {}

  public setQuickRequest(): void {
    let value = null;
    switch (this.option.type) {
      case OptionType.TEXT:
        const optionSelectedText: ImmediateOptionText = this.option as ImmediateOptionText;
        value = optionSelectedText.value;
        this.clickedOption.emit(value);
        break;
      case OptionType.LINK:
        const optionSelectedLink: ImmediateOptionLink = this.option as ImmediateOptionLink;
        this.router.navigateByUrl(optionSelectedLink.link);
        break;
      case OptionType.OTHER:
        value = null;
        this.clickedOption.emit(value);
        break;
      default:
        console.error('Option not allowed');
        break;
    }
  }
}
