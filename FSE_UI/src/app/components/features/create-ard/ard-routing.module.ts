import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArdDetailComponent } from './components/ard-detail/ard-detail.component';

const routes: Routes = [
  // {
  //   path: 'study-catalog',
  //   component: StudyCatalogComponent,
  //   data: { breadcrumb: 'Data Catalog', icon: '../../../../assets/images/datacatalog_icon.png' }
  // }
  {
    path: 'ard-catalog/:ardId',
    component: ArdDetailComponent,
    data: {
      breadcrumb: 'ARD Catalog',
      icon: '../../../../assets/images/idp-catalog-breadcrumb.svg',
    },
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ArdRoutingModule { }
