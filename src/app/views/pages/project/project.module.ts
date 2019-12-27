import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { Routes, RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../../../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';


const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {
        path: 'project',
        component: ProjectComponent,
      }
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
	DxDataGridModule,
	DxButtonModule
  ],
  exports: [RouterModule],
  declarations: [
   ProjectComponent,
  ]
})
export class ProjectModule { }
