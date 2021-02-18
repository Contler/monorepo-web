import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { DynamicModuleService } from './services/dynamic-module.service';

@NgModule({
  imports: [CommonModule, AngularFireDatabaseModule],
  providers: [DynamicModuleService],
})
export class DynamicServicesModule {}
