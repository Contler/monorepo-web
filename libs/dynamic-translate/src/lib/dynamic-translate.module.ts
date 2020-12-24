import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate.pipe';
import { Config, TranslateConfig } from './interface/config.interface';
import { AngularFireModule } from '@angular/fire';
import { TranslateService } from './translate.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { TRANSLATE_CONFIG } from './app.config';

@NgModule({
  imports: [CommonModule, AngularFireModule, TranslateModule, HttpClientModule],
  declarations: [TranslatePipe],
  providers: [TranslateService],
  exports: [TranslatePipe],
})
export class DynamicTranslateModule {
  static forRoot(config: Config): ModuleWithProviders<DynamicTranslateModule> {
    const appConfig: TranslateConfig = {
      url: config.url,
    };
    return {
      ngModule: DynamicTranslateModule,
      providers: [config.loader, { provide: TRANSLATE_CONFIG, useValue: appConfig }],
    };
  }
}
