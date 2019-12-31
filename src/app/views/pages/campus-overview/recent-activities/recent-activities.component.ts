import { Component, OnInit, Input } from '@angular/core';

export interface Timeline2Data {
	time: string;
	text: string;
	icon?: string;
	attachment?: string;
}

@Component({
  selector: 'kt-recent-activities',
  templateUrl: './recent-activities.component.html',
  styleUrls: ['./recent-activities.component.scss']
})
export class RecentActivitiesComponent implements OnInit {

	@Input() data: Timeline2Data[];

  constructor() { }

  ngOnInit() {
	if (!this.data) {
		this.data = [
			{
				time: '10:00',
				icon: 'fa fa-genderless kt-font-danger',
				text: 'Estimated budget for Anaheim Campus Lab Building.\n',
			},
			{
				time: '12:45',
				icon: 'fa fa-genderless kt-font-success',
				text: 'Received invoices for Anaheim Campus Lab Building.',
				attachment: '\n' +
					'<a href="$event.preventDefault();"><img src="./assets/media/users/100_4.jpg" title="" alt=""></a>' +
					'<a href="$event.preventDefault();"><img src="./assets/media/users/100_13.jpg" title="" alt=""></a>' +
					'<a href="$event.preventDefault();"><img src="./assets/media/users/100_11.jpg" title="" alt=""></a>' +
					'<a href="$event.preventDefault();"><img src="./assets/media/users/100_14.jpg" title="" alt=""></a>'
			},
			{
				time: '14:00',
				icon: 'fa fa-genderless kt-font-brand',
				text: 'Forwarded all invoices to Project Manager for review.',
			},
			{
				time: '17:00',
				icon: 'fa fa-genderless kt-font-info',
				text: 'Reviewed all the invoices received for Anaheim Campus Lab Building.',
			},
			{
				time: '16:00',
				icon: 'fa fa-genderless kt-font-brand',
				text: 'Selected invoice for Anaheim Campus Lab Building.',
			},
			{
				time: '17:00',
				icon: 'fa fa-genderless kt-font-danger',
				text: 'Material for building Anaheim Campus Lab is purchased.',
			},
		];
	}
  }

}
