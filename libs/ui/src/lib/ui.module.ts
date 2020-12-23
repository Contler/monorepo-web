import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { IconsService } from './services/icons/icons.service';
import { IconComponent } from './components/icon/icon.component';
import { StartComponent } from './components/start/start.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from './pipe/translate.pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    AngularFireDatabaseModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    TranslateModule,
  ],
  providers: [IconsService],
  declarations: [IconComponent, StartComponent, LayoutComponent, TranslatePipe],
  exports: [IconComponent, StartComponent, LayoutComponent, TranslatePipe],
})
export class UiModule {}
