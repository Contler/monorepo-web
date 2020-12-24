import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate.pipe';
import { Config } from './interface/config.interface';
import { AngularFireModule } from '@angular/fire';
import { TranslateService } from './translate.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, AngularFireModule, TranslateModule, HttpClientModule],
  declarations: [TranslatePipe],
  providers: [TranslateService],
  exports: [TranslatePipe],
})
export class DynamicTranslateModule {
  static forRoot(config: Config): ModuleWithProviders<DynamicTranslateModule> {
    return {
      ngModule: DynamicTranslateModule,
      providers: [config.loader],
    };
  }
}
