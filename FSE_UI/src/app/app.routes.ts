import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HomeComponent } from './components/main-page/home/home.component';
import { NotFoundPageComponent } from './components/auth/not-found-page/not-found-page.component';
import { AuthGuardService } from './components/auth/guards/auth-guard.service';
import { StudyCatalogComponent } from './components/features/create-idp/components/study-catalog/study-catalog.component';
import { AccountLoginComponent } from './components/auth/account-login/account-login.component';
import { PageNotFoundComponent } from './shared/shared-components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AccountLoginComponent },
  { path: 'user/not-found', component: NotFoundPageComponent },
  {
    path: '',
    component: MainPageComponent,
    children: [
      // {
      //   path: 'explore-data',
      //   loadChildren: () => {
      //     return import(
      //       '../../../FSE_UI/src/app/components/features/data-explorer/data-explorer.module'
      //     ).then((m) => m.DataExplorerModule);
      //   },
      //   canActivate:[AuthGuardService],
      //   data: { breadcrumb: 'Home' }
      // },
      {
        path: 'home',
        loadChildren: () => {
          return import(
            '../app/components/features/home/home.module'
          ).then((m) => m.HomeModule);
        },
        data: { breadcrumb: 'Home' }
      },
      // {
      //   path: 'idp',
      //   loadChildren: () => {
      //     return import(
      //       '../app/components/features/home/home.module'
      //     ).then((m) => m.HomeModule);
      //   },
      //   data: { breadcrumb: 'Home' }
      // }
      
      // {path:'**',component: PageNotFoundComponent } //uncomment while implementing wildcard
    ]
  }
];
