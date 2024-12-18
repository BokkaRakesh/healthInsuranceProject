import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdpRoutingModule } from './idp-routing.module';
import { StudyCatalogComponent } from './components/study-catalog/study-catalog.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateIdpSummaryComponent } from './components/create-idp-summary/create-idp-summary.component';
import { KendoModule } from '../../../modules/kendo/kendo.module';
import { CreateIdpDialogComponent } from './components/create-idp-dialog/create-idp-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, } from 'ngx-toastr';


@NgModule({
  declarations: [
    StudyCatalogComponent,
    CreateIdpSummaryComponent,
    CreateIdpDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IdpRoutingModule,
    SharedModule,
    KendoModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    })
  ]
})
export class IdpModule { }
