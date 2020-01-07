import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { CoreModule } from '../../../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PartialsModule } from '../../partials/partials.module';


import { FundManagementComponent } from './fund-management/fund-management.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import {
  DxTreeListModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxPivotGridModule,
  DxPopupModule,
  DxContextMenuModule
} from 'devextreme-angular';
import { CampusManagementComponent } from './campus-management/campus-management.component';
import { FundAllocationComponent } from './fund-allocation/fund-allocation.component';
import { CampusUpdateComponent } from './campus-management/campus-update/campus-update.component';
import { UpdateFundAllocationComponent } from './update-fund-allocation/update-fund-allocation.component';
import { FormsModule } from '@angular/forms';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { CampusOverviewTestComponent } from './campus-overview-test/campus-overview-test.component';





const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'funds',
        component: FundManagementComponent,
      },
      {
        path: 'adminsettings',
        component: AdminSettingsComponent,
      },
      {
        path: 'campuses',
        component: CampusManagementComponent,
      },
      {
        path: 'updateallocations',
        component: UpdateFundAllocationComponent,
	  },
	  {
        path: 'barchart',
        component: BarChartComponent,
	  },
	  {
        path: 'doughnutchart',
        component: DoughnutChartComponent,
	  },
	  {
        path: 'progressbar',
        component: ProgressBarComponent,
      },
      {
        path: 'testOverview',
        component: CampusOverviewTestComponent,
      },


    ]
  }
];



@NgModule({
  imports: [
    CommonModule,
    PartialsModule,
    NgbModule,
    CoreModule,
    HttpClientModule,
    PerfectScrollbarModule,
    RouterModule.forChild(routes),
    DxTreeListModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxDataGridModule,
    DxPivotGridModule,
    DxPopupModule,
    FormsModule,
    DxContextMenuModule,
  ],
  exports: [RouterModule],
  declarations: [
    SettingsComponent,
    FundManagementComponent,
    AdminSettingsComponent,
    CampusManagementComponent,
    FundAllocationComponent,
    CampusUpdateComponent,
    UpdateFundAllocationComponent,
    BarChartComponent,
    DoughnutChartComponent,
    ProgressBarComponent,
    CampusOverviewTestComponent,
  ],
  entryComponents: [
    CampusUpdateComponent
  ]
})
export class SettingsModule { }
