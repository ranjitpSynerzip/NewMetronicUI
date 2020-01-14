
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { CampusManagementService } from "./../../../shared/Services/campus-management.service";
import { HeaderTitleService } from '../../../shared/Services/header-title.service';
import { ActivatedRoute } from '@angular/router';
import { ChartModel } from '../../../shared/models/chart.model';



@Component({
	selector: "kt-college-dashboard",
	templateUrl: "./college-dashboard.component.html",
	styleUrls: ["./college-dashboard.component.scss"]
})



export class CollegeDashboardComponent implements OnInit, AfterViewInit {
	barchartData = new ChartModel();
	dataSource: any[];
	constructor(private service: CampusManagementService, private headerTitleService: HeaderTitleService, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.getCampus();
		this.headerTitleService.updatetitle('College Of the Desert');
		this.dataSource = this.route.snapshot.data.chartModel;
		if (this.dataSource) {
			this.barchartData.labels = this.dataSource.map(
				({ campusName }) => campusName
			);

			this.barchartData.datasets = this.dataSource.map(
				({ accountCode }) => accountCode
			);
		}
	}

	ngAfterViewInit() {

	}


	async getCampus() {
		// return await this.service.getCampusTest().then(data => {
		// 	this.dataSource = JSON.parse(JSON.stringify(data));
		// this.barchartData.labels = this.dataSource.map(
		// 	({ campusName }) => campusName
		// );

		// this.barchartData.datasets = this.dataSource.map(
		// 	({ accountCode }) => accountCode
		// );



		// this.barchartData.labels = ['Campus 1', 'Campus 2', 'Campus 3', 'Campus 4', 'Campus 5'];
		// this.barchartData.datasets = [1, 2, 3, 4, 5];
		// return this.barchartData;
		//});
	}


}
