import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunAnalysisRoutingModule } from './run-analysis-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { KendoModule } from '../../../modules/kendo/kendo.module';
import { RunAnalysisDetailCatalogComponent } from './run-analysis-detail-catalog/run-analysis-detail-catalog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RunAnalysisConfigurationComponent } from './run-analysis-configuration/run-analysis-configuration.component';
import { RunAnalysisModalDialogComponent } from './run-analysis-modal-dialog/run-analysis-modal-dialog.component';
import { RunAnalysisGridComponent } from './run-analysis-grid/run-analysis-grid.component';
import { AddFilesComponent } from './add-files/add-files.component';
import { AlgoCatalogModule } from '../algo-catalog/algo-catalog.module';
import { RunAnalysisDetailPopUpComponent } from './run-analysis-detail-pop-up/run-analysis-detail-pop-up.component';
import { ViewRunAnalysisComponent } from './view-run-analysis/view-run-analysis.component';
import { ArdModule } from '../create-ard/ard.module';
@NgModule({
  declarations: [
    RunAnalysisDetailCatalogComponent,
    RunAnalysisConfigurationComponent,
    RunAnalysisModalDialogComponent,
    RunAnalysisGridComponent,
    RunAnalysisDetailPopUpComponent,
    AddFilesComponent,
    ViewRunAnalysisComponent
  ],
  imports: [
    CommonModule,
    RunAnalysisRoutingModule,
    SharedModule,
    KendoModule,
    ReactiveFormsModule,
    AlgoCatalogModule,
    ArdModule
  ]
})
export class RunAnalysisModule { }
