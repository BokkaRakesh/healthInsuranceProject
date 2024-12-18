import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreDataComponent } from './explore-data/explore-data.component';

const routes: Routes = [
  {
    path: 'explore-data',
    component: ExploreDataComponent,
    data: { breadcrumb: 'Data Catalog' , icon: '../../../../assets/images/datacatalog_icon.png'},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataExplorerRoutingModule {}
