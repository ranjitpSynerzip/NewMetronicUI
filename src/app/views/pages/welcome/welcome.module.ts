// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { WelcomeComponent } from './welcome.component';


@NgModule({
  imports: [
    CommonModule,
    PartialsModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: WelcomeComponent
      },
    ]),
  ],
  providers: [],
  declarations: [
    WelcomeComponent,
  ]
})
export class WelcomeModule { }
