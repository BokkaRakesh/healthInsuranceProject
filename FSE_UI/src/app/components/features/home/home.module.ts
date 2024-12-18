import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { IdpModule } from '../create-idp/idp.module';
import { IdpCatalogModule } from '../idp-catalog/idp-catalog.module';
import { ArdModule } from '../create-ard/ard.module';
import { DataExplorerModule } from '../data-explorer/data-explorer.module';
import { AlgoDevelopmentModule } from '../algorithm-development/components/algo-development.module';
import { UberModule } from '../uber/uber.module';
import { AlgoCatalogModule } from '../algo-catalog/algo-catalog.module';
import { RequestAccessModule } from '../request-access/request-access.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IdpModule,
    ArdModule,
    IdpCatalogModule,
    DataExplorerModule,
    AlgoDevelopmentModule,
    UberModule,    
    AlgoCatalogModule,
    RequestAccessModule
  
  ]
})
export class HomeModule { }
