import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { StatusComponent } from './status.component';
import { DxDataGridModule, DxBulletModule, DxDateBoxModule } from 'devextreme-angular';
import { MatProgressSpinnerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		DxDataGridModule,
		DxBulletModule,
		DxDateBoxModule,
		FormsModule,
		MatProgressSpinnerModule,
		RouterModule.forChild([
			{
				path: '',
				component: StatusComponent
			},
		]),
	],
	providers: [],
	declarations: [
		StatusComponent,
	]
})
export class StatusModule { }
