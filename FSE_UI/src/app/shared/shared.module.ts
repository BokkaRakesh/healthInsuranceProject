import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbNavigationComponent } from './shared-components/breadcrumb-navigation/breadcrumb-navigation.component';
import { TabNavigationComponent } from './shared-components/tab-navigation/tab-navigation.component';
import { SearchBoxComponent } from './shared-components/search-box/search-box.component';
import { GipaiChatSearchComponent } from './shared-components/gipai-chat-search/gipai-chat-search.component';
import { KendoModule } from '../modules/kendo/kendo.module';
import { ToastrModule } from 'ngx-toastr';
import { WorkflowCardComponent } from './shared-components/workflow-box/workflow-card.component';
import { StepperComponent } from './shared-components/stepper/stepper.component';
import { SummaryComponent } from './shared-components/summary/summary.component';
import { GridComponent } from './shared-components/grid/grid.component';
import { TableColumnsComponent } from './shared-components/table-columns/table-columns.component';
import { FilterBadgeComponent } from './shared-components/filter-badge/filter-badge.component';
import { CascadeSearchBarComponent } from './shared-components/cascade-search-bar/cascade-search-bar.component';
import { IdpFilterDialogComponent } from './shared-components/idp-filter-dialog/idp-filter-dialog.component';
import { NoResultsFoundComponent } from './shared-components/no-results-found/no-results-found.component';
import { TablePopUpComponent } from './shared-components/table-pop-up/table-pop-up.component';
import { DataSummaryDetailComponent } from './shared-components/data-summary-detail/data-summary-detail.component';
import { AccessControlComponent } from './shared-components/access-control/access-control.component';
import { InsightsComponent } from './shared-components/insights/insights.component';
import { CriteriaDisplayComponent } from './shared-components/criteria-display/criteria-display.component';
import { AccessControlPopupComponent } from './shared-components/access-control-popup/access-control-popup.component';
import { PageNotFoundComponent } from './shared-components/page-not-found/page-not-found.component';
import { GipaiComponent } from './shared-components/gipai/gipai.component';
import { GipaiChatComponent } from './shared-components/gipai-chat/gipai-chat.component';
import { AccessRequestDialogComponent } from './shared-components/access-request-dialog/access-request-dialog.component';
import { FormatValuePipe } from './shared-components/format-value.pipe';
import { GridDetailComponent } from './shared-components/grid-detail/grid-detail.component';
import { ExpansionPanelComponent } from './shared-components/expansion-panel/expansion-panel.component';


@NgModule({
  declarations: [
    BreadcrumbNavigationComponent,
    TabNavigationComponent,
    SearchBoxComponent,
    GipaiChatSearchComponent,
    WorkflowCardComponent,
    StepperComponent,
    SummaryComponent,
    GridComponent,
    TableColumnsComponent,
    FilterBadgeComponent,
    CascadeSearchBarComponent,
    IdpFilterDialogComponent,
    NoResultsFoundComponent,
    TablePopUpComponent,
    DataSummaryDetailComponent,
    AccessControlComponent,
    InsightsComponent,
    CriteriaDisplayComponent,
    AccessControlPopupComponent,
    PageNotFoundComponent,
    GipaiComponent,
    GipaiChatComponent,
    AccessRequestDialogComponent,
    FormatValuePipe,
    GridDetailComponent,
    ExpansionPanelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    FormsModule,
    KendoModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
  ],
  exports: [
    BreadcrumbNavigationComponent,
    TabNavigationComponent,
    SearchBoxComponent,
    GipaiChatSearchComponent,
    WorkflowCardComponent,
    StepperComponent,
    SummaryComponent,
    GridComponent,
    TableColumnsComponent,
    FilterBadgeComponent,
    CascadeSearchBarComponent,
    IdpFilterDialogComponent,
    NoResultsFoundComponent,
    TablePopUpComponent,
    DataSummaryDetailComponent,
    AccessControlComponent,
    InsightsComponent,
    CriteriaDisplayComponent,
    AccessControlPopupComponent,
    PageNotFoundComponent,
    GipaiComponent,
    GipaiChatComponent,
    AccessRequestDialogComponent,
    FormatValuePipe,
    GridDetailComponent,
    ExpansionPanelComponent
  ]
})
export class SharedModule { }
