import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderTitleService } from '../../../shared/Services/header-title.service';

@Component({
  selector: 'kt-project-group',
  templateUrl: './project-group.component.html',
  styleUrls: ['./project-group.component.scss']
})
export class ProjectGroupComponent implements OnInit {


	constructor(private headerTitleService : HeaderTitleService) { }
	ngOnInit() {
		this.headerTitleService.updatetitle('Project Group');
	  }




}
