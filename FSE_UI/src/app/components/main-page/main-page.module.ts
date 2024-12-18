import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KendoModule } from '../../modules/kendo/kendo.module';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { DataExplorerModule } from '../features/data-explorer/data-explorer.module';
import { RouterModule } from '@angular/router';
import { WorkflowComponent } from './workflow/workflow.component';
import { FormsModule } from '@angular/forms';
import { WorkflowCardsContainerComponent } from './workflow-cards-container/workflow-cards-container.component';
import { ExploreDataSearchContainerComponent } from './search-containers/explore-data-search-container/explore-data-search-container.component';
import { IdpCatalogSearchContainerComponent } from './search-containers/idp-catalog-search-container/idp-catalog-search-container.component';
import { CreateIdpSearchContainerComponent } from './search-containers/create-idp-search-container/create-idp-search-container.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { IdpModule } from '../features/create-idp/idp.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { WorkflowActivitiesComponent } from './workflow-activities/workflow-activities.component';
import { RequestAccessModule } from '../features/request-access/request-access.module';
@NgModule({
  declarations: [
    MainPageComponent,
    SideBarComponent,
    HeaderComponent,
    HomeComponent,
    WorkflowComponent,
    WorkflowCardsContainerComponent,
    ExploreDataSearchContainerComponent,
    CreateIdpSearchContainerComponent,
    IdpCatalogSearchContainerComponent,
    WorkflowActivitiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    KendoModule,
    SharedModule,
    FormsModule,
    DataExplorerModule,
    IdpModule,
    MainPageRoutingModule,
    GridModule,
    RequestAccessModule

  ],
  exports: [
    MainPageComponent,
    SideBarComponent,
    HeaderComponent
  ]
})
export class MainPageModule { }
