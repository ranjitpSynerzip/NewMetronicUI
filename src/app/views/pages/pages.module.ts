import { ProjectGroupDetailsModule } from './project-group-details/project-group-details.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { WelcomeModule } from './welcome/welcome.module';
import { DevgridModule } from './dev-grid/devgrid.module';
import { StatusModule } from './status/status.module';
import { SettingsModule } from './settings/settings.module';
import { ProjectModule } from './project/project.module';
import { CampusModule } from './campus/campus.module';
import { CampusOverviewModule } from './campus-overview/campus-overview.module';
import { ProjectDetailsModule } from './project-details/project-details.module';


@NgModule({
	declarations: [],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		WelcomeModule,
		DevgridModule,
		StatusModule,
		SettingsModule,
		ProjectModule,
		CampusModule,
		CampusOverviewModule,
		ProjectDetailsModule,
		ProjectGroupDetailsModule

	],
	providers: []
})
export class PagesModule {
}
