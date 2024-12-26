import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { DataSummaryComponent } from '../data-summary/data-summary.component';
import { KendoModule } from '../../../modules/kendo/kendo.module';
import { IdpModule } from '../create-idp/idp.module';

import { ManageAccessRequestRoutingModule } from './manage-access-requests-routing.module';
import { FormsModule } from '@angular/forms';
import { ManageAccessRequestsComponent } from './manage-access-requests.component';
import { ManageAccessRequestsDialogComponent } from './manage-access-requests-dialog/manage-access-requests-dialog.component';

@NgModule({
  declarations: [
    ManageAccessRequestsComponent,
    ManageAccessRequestsDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ManageAccessRequestsComponent,
    ManageAccessRequestsDialogComponent,
    SharedModule,
    KendoModule,
    ManageAccessRequestRoutingModule
  ]
})
export class RequestAccessModule { }
