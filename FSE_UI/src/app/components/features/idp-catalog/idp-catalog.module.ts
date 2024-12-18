import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdpCatalogComponent } from './components/idp-catalog/idp-catalog.component';
import { IdpCatalogRoutingModule } from './idp-catalog-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { IdpDetailComponent } from './components/idp-detail/idp-detail.component';
import { IdpDocumentationComponent } from './components/idp-documentation/idp-documentation.component';
import { IdpSummaryComponent } from './components/idp-summary/idp-summary.component';
import { KendoModule } from '../../../modules/kendo/kendo.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IdpSubjectsComponent } from './components/idp-subjects/idp-subjects.component';
import { IdpFilesComponent } from './components/idp-files/idp-files.component';
import { IdpArdsComponent } from './components//idp-ards/idp-ards.component';
import { IdpClinicalDataComponent } from './components/idp-clinical-data/idp-clinical-data.component';
@NgModule({
  declarations: [
    IdpCatalogComponent,
    IdpDetailComponent,
    IdpDocumentationComponent,
    IdpSummaryComponent,
    IdpSubjectsComponent,
    IdpFilesComponent,
    IdpArdsComponent,
    IdpClinicalDataComponent
  ],
  imports: [
    CommonModule,
    IdpCatalogRoutingModule,
    SharedModule,
    KendoModule,
    ReactiveFormsModule
  ],
  exports : [ 
    IdpFilesComponent,
    IdpSubjectsComponent,
    IdpArdsComponent,
    IdpClinicalDataComponent
  ]
})
export class IdpCatalogModule { }
