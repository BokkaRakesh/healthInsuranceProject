import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataExplorerRoutingModule } from './data-explorer-routing.module';
import { ExploreDataComponent } from './explore-data/explore-data.component';
import { SharedModule } from '../../../shared/shared.module';
import { DataSummaryComponent } from '../data-summary/data-summary.component';
import { KendoModule } from '../../../modules/kendo/kendo.module';
import { IdpModule } from '../create-idp/idp.module';
import { ExploreDocDialogComponent } from './explore-doc-dialog/explore-doc-dialog.component';


@NgModule({
  declarations: [
    ExploreDataComponent,
    DataSummaryComponent,
    ExploreDocDialogComponent
  ],
  imports: [
    CommonModule,
    DataExplorerRoutingModule,
    SharedModule,
    KendoModule,
    IdpModule
  ]
})
export class DataExplorerModule { }
