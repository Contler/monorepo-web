import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage,
        children: [
          { path: "", redirectTo: "inmediate-requests", pathMatch: "full" },
          {
            path: "inmediate-requests",
            loadChildren: () =>
              import("./inmediate-requests/inmediate-requests.module").then(
                m => m.InmediateRequestsPageModule
              )
          },
          {
            path: "special-requests",
            loadChildren: () =>
              import("./special-requests/special-requests.module").then(
                m => m.SpecialRequestsPageModule
              )
          }
        ]
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
