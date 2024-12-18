import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RunAnalysisDetailCatalogComponent } from './run-analysis-detail-catalog/run-analysis-detail-catalog.component';

const routes: Routes = [
  {path:'run', component: RunAnalysisDetailCatalogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RunAnalysisRoutingModule { }
