import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: "contler-searchbar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"]
})
export class SearchbarComponent implements OnInit {
  @Input() placeholder = "Buscar término...";
  @Output() value: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    const input = document.getElementById("input_search");
    if (input) {
      input.focus();
    }
  }

  emitValue(term: string) {
    this.value.emit(term.toLowerCase().trim());
  }
}
