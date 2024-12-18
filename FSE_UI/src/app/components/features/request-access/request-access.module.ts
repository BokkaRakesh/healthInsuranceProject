import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { DataSummaryComponent } from '../data-summary/data-summary.component';
import { KendoModule } from '../../../modules/kendo/kendo.module';
import { IdpModule } from '../create-idp/idp.module';
import { RequestAccessDocDialogComponent } from './request-access-dialog/request-access-dialog.component';

import { RequestAccessRoutingModule } from './request-access-routing.module';
import { RequestAccessComponent } from './request-access/request-access.component';



@NgModule({
  declarations: [
    RequestAccessComponent,
    RequestAccessDocDialogComponent
  ],
  imports: [
    CommonModule,
    RequestAccessRoutingModule,
    SharedModule,
    KendoModule,
    IdpModule
  ]
})
export class RequestAccessModule { }
