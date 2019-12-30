import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../../../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ProjectGroupDetailsComponent } from './project-group-details.component';


const routes: Routes = [
	{
	  path: '',
	  component: ProjectGroupDetailsComponent,
	  children: [
		{
		  path: 'projectgroupdetails',
		  component: ProjectGroupDetailsComponent,
		}
	  ]
	}
  ];



@NgModule({
  declarations: [ProjectGroupDetailsComponent],
  imports: [
    CommonModule,
    PartialsModule,
    NgbModule,
    CoreModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ProjectGroupDetailsModule { }
