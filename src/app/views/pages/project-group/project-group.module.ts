import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../../../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProjectGroupComponent } from './project-group.component';
import { DxDataGridModule, DxButtonModule, DxDateBoxModule } from 'devextreme-angular';



const routes: Routes = [
	{
	  path: '',
	  component: ProjectGroupComponent,
	//   children: [
	// 	{
	// 	  path: 'addproject',
	// 	  component: AddProjectComponent,
	// 	},
	// 	{
	// 	  path: 'projectlist',
	// 	  component: ProjectListComponent,
	// 	}, {
	// 	  path: '',
	// 	  component: ProjectListComponent,
	// 	}
	//   ]
	}
  ];

@NgModule({
  imports: [
    CommonModule,
    PartialsModule,
	NgbModule,
	DxDataGridModule,
	DxButtonModule,
	DxDateBoxModule,
    CoreModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
  exports: [RouterModule],
  declarations: [
    ProjectGroupComponent,
  ]
})
export class ProjectGroupModule { }
