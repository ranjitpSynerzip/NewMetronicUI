import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kt-status-info',
  templateUrl: './status-info.component.html',
  styleUrls: ['./status-info.component.scss']
})
export class StatusInfoComponent implements OnInit {

	@Input() icon: string = 'flaticon2-search-1';

	// Set true to icon as SVG or false as icon class
	@Input() useSVG: boolean;

	@Input() type: 'brand' | 'success' | 'warning' = 'success';


  constructor() { }

  ngOnInit() {
  }

}
