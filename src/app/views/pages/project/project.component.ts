import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderTitleService } from '../../../shared/Services/header-title.service';



@Component({
  selector: 'kt-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {


  constructor(private headerTitleService : HeaderTitleService) { }
  ngOnInit() {
    this.headerTitleService.updatetitle('Projects');
  }

}
