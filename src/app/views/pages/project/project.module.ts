import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { Routes, RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../../../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DxDataGridModule, DxButtonModule, DxDateBoxModule } from 'devextreme-angular';
import { AddProjectComponent } from './add-project/add-project.component';
import { FormsModule } from '@angular/forms';
import { ProjectListComponent } from './project-list/project-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {
        path: 'addproject',
        component: AddProjectComponent,
      },
      {
        path: 'projectlist',
        component: ProjectListComponent,
      }, {
        path: '',
        component: ProjectListComponent,
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
    DxButtonModule,
    DxDateBoxModule,
    FormsModule,
  ],
  exports: [RouterModule],
  declarations: [
    ProjectComponent,
    AddProjectComponent,
    ProjectListComponent,
  ]
})
export class ProjectModule { }
