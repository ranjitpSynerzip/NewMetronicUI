import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DxTreeListModule, DxContextMenuModule } from 'devextreme-angular';

import { CollegeDashboardComponent } from './college-dashboard.component';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { CollegeBudgetSummaryComponent } from './college-budget-summary/college-budget-summary.component';



const routes: Routes = [
  {
    path: '',
    component: CollegeDashboardComponent,
    children: [
      {
        path: '',
        component: CollegeDashboardComponent,
      },
      {
        path: 'collegeBudgetSummary',
        component: CollegeBudgetSummaryComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    PartialsModule,
    CoreModule,
    HttpClientModule,
    PerfectScrollbarModule,
    RouterModule.forChild(routes),
    DxTreeListModule,
    DxContextMenuModule,
  ],
  exports: [RouterModule],
  declarations: [
    CollegeDashboardComponent,
    CollegeBudgetSummaryComponent
  ],
  entryComponents: []
})
export class CollegeDashboardModule { }
