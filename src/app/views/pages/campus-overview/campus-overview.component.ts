import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../../../shared/Services/header-title.service';

@Component({
  selector: 'kt-campus-overview',
  templateUrl: './campus-overview.component.html',
  styleUrls: ['./campus-overview.component.scss']
})
export class CampusOverviewComponent implements OnInit {

  constructor(private headerTitleService: HeaderTitleService) { }

  ngOnInit() {
    this.headerTitleService.updatetitle('Campus Overview');
  }

}
