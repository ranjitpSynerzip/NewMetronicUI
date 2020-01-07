// Angular
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
// Layout
// import { LayoutConfigService } from '../../../../../core/_base/layout';

// import { LayoutConfigService} from './core/_base/layout';

// Charts
import { Chart } from "chart.js/dist/Chart.min.js";
// import { LayoutConfigService } from 'src/app/core/_base/layout';
import { LayoutConfigService } from "../../../../core/_base/layout/services/layout-config.service";
import { CampusManagementService } from "./../../../../shared/Services/campus-management.service";
import { Campusmodel } from "./../../../../shared/models/campusmodel";

@Component({
	selector: "kt-bar-chart",
	templateUrl: "./bar-chart.component.html",
	styleUrls: ["./bar-chart.component.scss"]
})
export class BarChartComponent implements OnInit {
	// Public properties
	@Input() title: string;
	@Input() desc: string;
	@Input() data: { labels: string[]; datasets: any[] };
	@ViewChild("chart", { static: true }) chart: ElementRef;
	dataSource: Campusmodel[];
	campusnames: any = [];
	campusacccodes: any = [];

	constructor(
		private layoutConfigService: LayoutConfigService,
		private service: CampusManagementService
	) {}

	ngOnInit() {
		this.service.getCampus().subscribe(data => {
			this.dataSource = data;
			console.log(this.dataSource);

			this.campusnames = this.dataSource.map(
				({ campusName }) => campusName
			);

			this.campusacccodes = this.dataSource.map(
				({ accountCode }) => accountCode
			);

			if (!this.data) {
				this.data = {
					labels: this.campusnames,
					datasets: [
						{
							// label: 'dataset 1',
							backgroundColor: this.layoutConfigService.getConfig(
								"colors.state.success"
							),
							data: this.campusacccodes,
						}
					]
				};
			}

			this.initChartJS();
		});
	}

	/** Init chart */
	initChartJS() {
		const chart = new Chart(this.chart.nativeElement, {
			type: "bar",
			data: this.data,
			options: {
				title: {
					display: false
				},
				tooltips: {
					intersect: false,
					mode: "nearest",
					xPadding: 10,
					yPadding: 10,
					caretPadding: 10
				},
				legend: {
					display: false
				},
				responsive: true,
				maintainAspectRatio: false,
				barRadius: 4,
				scales: {
					xAxes: [
						{
							display: false,
							gridLines: false,
							stacked: true
						}
					],
					yAxes: [
						{
							display: false,
							stacked: true,
							gridLines: false
						}
					]
				},
				layout: {
					padding: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0
					}
				}
			}
		});
	}
}
