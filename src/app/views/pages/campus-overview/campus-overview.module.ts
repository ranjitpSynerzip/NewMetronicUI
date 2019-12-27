import { CampusNotesComponent } from './campus-notes/campus-notes.component';
import { CampusOverviewComponent } from './campus-overview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { CampusInfoComponent } from './campus-info/campus-info.component';
import { CampusContactComponent } from './campus-contact/campus-contact.component';
import { RecentActivitiesComponent } from './recent-activities/recent-activities.component';

const routes: Routes = [
	{
	  path: '',
	  component: CampusOverviewComponent,
	  children: [
		{
		  path: 'campusinfo',
		  component: CampusInfoComponent,
		},
		{
			path: 'campusnotes',
			component: CampusNotesComponent,
		  },
		  {
			path: 'campuscontact',
			component: CampusContactComponent,
		  },
		  {
			path: 'recentactivity',
			component: RecentActivitiesComponent,
		  },
	  ]
	}
  ];


@NgModule({
  declarations: [CampusOverviewComponent, CampusInfoComponent, CampusNotesComponent, CampusContactComponent, CampusContactComponent, RecentActivitiesComponent],
  imports: [
    CommonModule,
	PartialsModule,
    CoreModule,
    HttpClientModule,
    RouterModule.forChild(routes),
	DxDataGridModule,
	DxButtonModule
  ],
  exports: [RouterModule],
})
export class CampusOverviewModule { }
