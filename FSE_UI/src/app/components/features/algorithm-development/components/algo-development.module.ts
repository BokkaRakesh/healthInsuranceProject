import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, } from 'ngx-toastr';
import { KendoModule } from '../../../../modules/kendo/kendo.module';
import { AlgoDevelopmentRoutingModule } from './algo-development-routing.module';
import { AlgoDevelopmentDialogComponent } from './algo-development-dialog/algo-development-dialog.component';


@NgModule({
  declarations: [
    AlgoDevelopmentDialogComponent
  ],
  imports: [
    CommonModule,
    AlgoDevelopmentRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    KendoModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    })
  ]
})
export class AlgoDevelopmentModule { }
