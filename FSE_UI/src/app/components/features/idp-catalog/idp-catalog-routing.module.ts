import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdpDetailComponent } from './components/idp-detail/idp-detail.component';
import { IdpCatalogComponent } from './components/idp-catalog/idp-catalog.component';
import { ArdDetailComponent } from '../create-ard/components/ard-detail/ard-detail.component';
import { ArdDetailCatalogComponent } from '../create-ard/components/ard-detail-catalog/ard-detail-catalog.component';

const routes: Routes = [
  {
    path: 'idp-catalog',
    component: IdpCatalogComponent,
    data: {
      breadcrumb: 'IDP Catalog',
      icon: '../../../../assets/images/idp-catalog-breadcrumb-icon.svg',
    },
    children: [
      {
        path: 'idp/:idpId',
        component: IdpDetailComponent,
        data: {
          breadcrumb: 'IDP',
          icon: '../../../../assets/images/idp-breadcrumb.svg',
        },
      },
      {
        path: 'ard',
        component: ArdDetailCatalogComponent,
        data: {
          breadcrumb: 'IDP Name',
          icon: '../../../../assets/images/idp-breadcrumb.svg',
          enableCustomRoute: true
        },
        children: [
          {
            path: 'ard-details/:ardId/:idpId',
            component: ArdDetailComponent,
            data: {
              breadcrumb: 'ARD',
              icon: '../../../../assets/images/ard-breadcrumb.svg',
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdpCatalogRoutingModule { }
