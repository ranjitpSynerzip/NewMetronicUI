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
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { CollegeDashboardResolver } from './college-dashboard-resolver';


const routes: Routes = [
  {
    path: '',
    component: CollegeDashboardComponent,
    resolve: { chartModel: CollegeDashboardResolver },
    children: [
      {
        path: '',
        component: CollegeDashboardComponent,
      },
      {
        path: 'collegeBudgetSummary',
        component: CollegeBudgetSummaryComponent,
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
    CollegeBudgetSummaryComponent,
    BarChartComponent,
    DoughnutChartComponent,
    ProgressBarComponent,
  ],
  entryComponents: [],
  providers: [CollegeDashboardResolver],
})
export class CollegeDashboardModule { }
