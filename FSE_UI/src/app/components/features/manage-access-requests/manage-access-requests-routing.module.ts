import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAccessRequestsComponent } from './manage-access-requests.component';

const routes: Routes = [
  {
    path: 'manage-access-requests',
    component: ManageAccessRequestsComponent,
    data: { breadcrumb: 'Access Requests', icon: '../../../../assets/images/datacatalog_icon.png' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAccessRequestRoutingModule { }
