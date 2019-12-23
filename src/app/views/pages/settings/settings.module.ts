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
import { DxTreeListModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxPivotGridModule } from 'devextreme-angular';
import { CampusManagementComponent } from './campus-management/campus-management.component';
import { FundAllocationComponent } from './fund-allocation/fund-allocation.component';





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
  ],
  exports: [RouterModule],
  declarations: [
    SettingsComponent,
    FundManagementComponent,
    AdminSettingsComponent,
    CampusManagementComponent,
    FundAllocationComponent,
  ]

})
export class SettingsModule { }
