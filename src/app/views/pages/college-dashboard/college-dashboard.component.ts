
import { Component, OnInit } from "@angular/core";
import { CampusManagementService } from "./../../../shared/Services/campus-management.service";


export class campusTest {
	labels: string[];
	datasets: any[];
}

@Component({
	selector: "kt-college-dashboard",
	templateUrl: "./college-dashboard.component.html",
	styleUrls: ["./college-dashboard.component.scss"]
})



export class CollegeDashboardComponent implements OnInit {
	//const testmodal: new { labels: string[]; datasets: any[] };
	barchartData : campusTest;
	dataSource: any[];

	constructor(private service: CampusManagementService) {}

	ngOnInit() {
		this.service.getCampus().subscribe(data => {
			this.dataSource = data;
			this.barchartData.labels = this.dataSource.map(
				({ campusName }) => campusName
			);

			this.barchartData.datasets = this.dataSource.map(
				({ accountCode }) => accountCode
			);
		});
	}
}
