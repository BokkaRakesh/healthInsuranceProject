import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { AppBarModule } from '@progress/kendo-angular-navigation';
import { DropDownsModule, KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { KENDO_POPUP } from '@progress/kendo-angular-popup';
import { KENDO_LAYOUT, LayoutModule } from '@progress/kendo-angular-layout';
import { KENDO_INDICATORS } from '@progress/kendo-angular-indicators';
import { KENDO_PROGRESSBARS } from '@progress/kendo-angular-progressbar';
import { GridModule, KENDO_GRID } from '@progress/kendo-angular-grid';
import { SVGIconModule } from '@progress/kendo-angular-icons';
import { KENDO_TOOLTIPS } from '@progress/kendo-angular-tooltip';
import { DialogsModule, KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { LabelModule } from '@progress/kendo-angular-label';
import { IconsModule } from '@progress/kendo-angular-icons';
import { FilterModule } from "@progress/kendo-angular-filter";
import { KENDO_LISTVIEW, ListViewModule } from "@progress/kendo-angular-listview";
import { PopupModule } from '@progress/kendo-angular-popup';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { KENDO_SCROLLVIEW } from "@progress/kendo-angular-scrollview";
const kendoComponents = [
  ButtonsModule,
  InputsModule,
  LayoutModule,
  AppBarModule,
  DropDownsModule,
  SVGIconModule,
  ...KENDO_INDICATORS,
  ...KENDO_DROPDOWNS,
  ...KENDO_POPUP,
  ...KENDO_PROGRESSBARS,
  ...KENDO_GRID,
  ...KENDO_TOOLTIPS,
  ...KENDO_DIALOG,
  ...KENDO_LAYOUT,
  ...KENDO_LISTVIEW,
  ...KENDO_SCROLLVIEW,
  DialogsModule,
  LabelModule,
  IconsModule,
  DropDownsModule,
  ListViewModule,
  PopupModule,
  FilterModule,
  DateInputsModule,
  // PopoverComponent
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GridModule,
    ...kendoComponents
  ],
  exports: [ ...kendoComponents ]
})
export class KendoModule { }
