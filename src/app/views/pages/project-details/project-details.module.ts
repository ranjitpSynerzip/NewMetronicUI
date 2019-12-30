import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details.component';
import { Routes, RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../../../core/core.module';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
	{
	  path: '',
	  component: ProjectDetailsComponent,
	  children: [
		{
		  path: 'projectdetails',
		  component: ProjectDetailsComponent,
		}
	  ]
	}
  ];

@NgModule({
  declarations: [ProjectDetailsComponent],
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
export class ProjectDetailsModule { }
