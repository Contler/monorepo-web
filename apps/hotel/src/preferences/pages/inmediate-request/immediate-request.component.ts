import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModuleData } from '../../interfaces/module-data';

@Component({
  selector: 'contler-immediate-request',
  templateUrl: './immediate-request.component.html',
  styleUrls: ['./immediate-request.component.scss'],
})
export class ImmediateRequestComponent implements OnInit {
  data: ModuleData = {
    title: '',
    icon: '',
    description: '',
    description2: '',
  };

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.get('preferences.immediate.name').subscribe((dataTranslate) => {
      this.data.title = dataTranslate;
    });
  }
}
