import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlgoCatalogComponent } from './components/algo-catalog/algo-catalog.component';

const routes: Routes = [
  {
    path: 'algoCatalog',
    component: AlgoCatalogComponent,
    data: { breadcrumb: 'Algo Catalog' , icon: '../../../../assets/images/explore-algorithms.svg'},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlgoCatalogRoutingModule { }
