import { Component, OnInit } from '@angular/core';
import { CampusManagementService } from '../../../shared/Services/campus-management.service';

export class campusTest {
	labels: string[];
	datasets: any[];
}


@Component({
  selector: 'kt-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  barchartData = new campusTest();
	dataSource: any[];

	constructor(private service: CampusManagementService) {
	}

	ngOnInit() {
		// this.barchartData.labels = this.dataSource.map(
		// 	({ campusName }) => campusName
		// );

		// this.barchartData.datasets = this.dataSource.map(
		// 	({ accountCode }) => accountCode
		// );
		this.getCampus();

	}

	ngAfterViewInit() {

	}


	async getCampus() {
		return await this.service.getCampusTest().then(data => {
			// this.dataSource = JSON.parse(JSON.stringify(data));
			// console.log('datadsadasbar', this.dataSource);
			// this.barchartData.labels = this.dataSource.map(
			// 	({ campusName }) => campusName
			// );

			// this.barchartData.datasets = this.dataSource.map(
			// 	({ accountCode }) => accountCode
			// );

			this.barchartData.labels = ['Campus 1', 'Campus 2', 'Campus 3', 'Campus 4', 'Campus 5'];
			this.barchartData.datasets = [1, 2, 3, 4, 5];
			//this.dataset = JSON.parse(JSON.stringify(this.barchartData));
			// console.log( 	this.dataset);

			//return this.barchartData;
		});
	}

}
