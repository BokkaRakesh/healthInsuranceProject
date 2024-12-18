import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlgoCatalogRoutingModule } from './algo-catalog-routing.module';
import { AlgoCatalogComponent } from './components/algo-catalog/algo-catalog.component';
import { KendoModule } from '../../../modules/kendo/kendo.module';
import { SharedModule } from '../../../shared/shared.module';
import { AlgoDetailViewComponent } from './components/algo-detail-view/algo-detail-view.component';


@NgModule({
  declarations: [
    AlgoCatalogComponent,
    AlgoDetailViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    KendoModule,
    AlgoCatalogRoutingModule
  ]
})
export class AlgoCatalogModule { }
