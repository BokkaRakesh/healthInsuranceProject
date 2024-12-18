import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestAccessComponent } from './request-access/request-access.component';

const routes: Routes = [
  {
    path: 'request-access',
    component: RequestAccessComponent,
    data: { breadcrumb: 'Request Access', icon: '../../../../assets/images/datacatalog_icon.png' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestAccessRoutingModule { }
