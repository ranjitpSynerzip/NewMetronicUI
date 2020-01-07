import { CampusComponent } from './campus.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../../../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';

const routes: Routes = [
	{
		path: '',
		component: CampusComponent,
		children: [
			{
				path: 'campus',
				component: CampusComponent,
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
		RouterModule.forChild(routes),
		DxDataGridModule,
		DxButtonModule
	],
	exports: [RouterModule],
	declarations: [
		CampusComponent,
	]
})
export class CampusModule { }
