import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDashboardComponent } from './project-dashboard.component';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DxTreeListModule, DxContextMenuModule } from 'devextreme-angular';
import { ProjectBudgetSummaryComponent } from './project-budget-summary/project-budget-summary.component';


const routes: Routes = [
  {
    path: '',
    component: ProjectDashboardComponent ,
    children: [
      {
        path: '',
        component: ProjectDashboardComponent,
      },
      {
        path: 'collegeBudgetSummary',
        component: ProjectBudgetSummaryComponent,
      }
      // {
      //   path: 'doughnutchart',
      //   component: DoughnutChartComponent,
      // },
      // {
      //   path: 'progressbar',
      //   component: ProgressBarComponent,
      // },
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
    ProjectDashboardComponent,
    ProjectBudgetSummaryComponent
  ],
  entryComponents: []
})
export class ProjectDashboardModule { }
