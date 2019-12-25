// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
// Auth
import { AuthGuard } from '../../../core/auth';

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'builder',
				loadChildren: () => import('app/views/themes/demo1/content/builder/builder.module').then(m => m.BuilderModule)
			},
			{
				path: 'welcome',
				loadChildren: () => import('app/views/pages/welcome/welcome.module').then(m => m.WelcomeModule)
			},
			{
				path: 'status',
				loadChildren: () => import('app/views/pages/status/status.module').then(m => m.StatusModule)
			},
			{
				path: 'devgrid',
				loadChildren: () => import('app/views/pages/dev-grid/devgrid.module').then(m => m.DevgridModule)
			},
			{
				path: 'settings',
				loadChildren: () => import('app/views/pages/settings/settings.module').then(m => m.SettingsModule)
			},
			{
				path: 'projects',
				loadChildren: () => import('app/views/pages/project/project.module').then(m => m.ProjectModule)
			},
		
		

			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'dashboard'}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
