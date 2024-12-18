import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, } from 'ngx-toastr';
import { KendoModule } from '../../../modules/kendo/kendo.module';
import { UberRoutingModule } from './uber-routing.module';
import { UberDialogComponent } from './uber-dialog/uber-dialog.component';


@NgModule({
  declarations: [
    UberDialogComponent
  ],
  imports: [
    CommonModule,
    UberRoutingModule,
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
export class UberModule { }
