import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudyCatalogComponent } from './components/study-catalog/study-catalog.component';

const routes: Routes = [
  {
    path: 'study-catalog',
    component: StudyCatalogComponent,
    data: { breadcrumb: 'Data Catalog', icon: '../../../../assets/images/datacatalog_icon.png' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdpRoutingModule { }
