import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DevGridComponent } from './dev-grid.component';
import { DxDataGridModule, DxBulletModule } from 'devextreme-angular';


@NgModule({

  imports: [
	CommonModule,
	PartialsModule,
	CoreModule,
	DxDataGridModule,
	DxBulletModule,
	RouterModule.forChild([
		{
			path: '',
			component: DevGridComponent
		},
	]),
],
providers: [],
	declarations: [
		DevGridComponent,
	],
	/* bootstrap: [DevGridComponent] */
})
export class DevgridModule { }
