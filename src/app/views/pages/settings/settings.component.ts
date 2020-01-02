import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../../../shared/Services/header-title.service';

@Component({
  selector: 'kt-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private headerTitleService: HeaderTitleService) { }

  ngOnInit() {
    this.headerTitleService.updatetitle('Settings');
  }

}
