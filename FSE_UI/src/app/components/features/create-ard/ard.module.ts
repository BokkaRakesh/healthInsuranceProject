import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArdRoutingModule } from './ard-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { CreateArdDialogComponent } from './components/create-ard-dialog/create-ard-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, } from 'ngx-toastr';
import { KendoModule } from '../../../modules/kendo/kendo.module';
import { ArdDetailComponent } from './components/ard-detail/ard-detail.component';
import { ArdDocumentationTabComponent } from './components/ard-documentation-tab/ard-documentation-tab.component';
import { IdpCatalogModule } from '../idp-catalog/idp-catalog.module';
import { ArdDetailCatalogComponent } from './components/ard-detail-catalog/ard-detail-catalog.component';

@NgModule({
  declarations: [
    CreateArdDialogComponent,
    ArdDetailComponent,
    ArdDocumentationTabComponent,
    ArdDetailCatalogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ArdRoutingModule,
    SharedModule,
    KendoModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
    IdpCatalogModule
  ]
})
export class ArdModule { }
