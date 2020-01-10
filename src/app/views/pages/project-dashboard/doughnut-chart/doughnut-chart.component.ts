// Angular
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// Layout
// import { LayoutConfigService } from '../../../../../core/_base/layout';

// import { LayoutConfigService} from './core/_base/layout';

// Charts
import { Chart } from 'chart.js/dist/Chart.min.js';
// import { LayoutConfigService } from 'src/app/core/_base/layout';
import { LayoutConfigService } from '../../../../core/_base/layout/services/layout-config.service';
import { Campusmodel } from '../../../../shared/models/campusmodel';
import { CampusManagementService } from '../../../../shared/Services/campus-management.service';

@Component({
  selector: 'kt-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

	@Input() title: string;
	@Input() desc: string;
	@Input() data: { labels: string[]; datasets: any[] };
	@ViewChild('chart', {static: true}) chart: ElementRef;
	dataSource: Campusmodel[];
	campusnames: any = [];
	campusacccodes: any = [];

	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 */
	constructor(private layoutConfigService: LayoutConfigService, private service: CampusManagementService) {
	}

	ngOnInit() {

		this.service.getCampus().subscribe(data => {
			this.dataSource = data;

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
							// backgroundColor: this.layoutConfigService.getConfig(
							// 	"colors.state.success"
							// ),
							data: this.campusacccodes,
							backgroundColor: [
								'rgba(255,99,132,1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)',
								'rgba(75, 192, 192, 1)',
								'rgba(153, 102, 255, 1)',
								'rgba(255, 159, 64, 1)'
							],
						}
					]
				};
			}

			this.initChartJS();
		});




		// if (!this.data) {
		// 	this.data = {
		// 		labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9', 'Label 10', 'Label 11', 'Label 12', 'Label 13', 'Label 14', 'Label 15', 'Label 16'],
		// 		datasets: [
		// 			{
		// 				// label: 'dataset 1',
		// 				//backgroundColor: this.layoutConfigService.getConfig('colors.state.success'),
		// 				data: [
		// 					15, 20, 25
		// 				],

		// 				backgroundColor: [
		// 					"#6277FE",
		// 					"#4BC0A4",
		// 					"#F53392",
		// 				],
		// 			}
		// 		]
		// 	};
		// }

		// this.initChartJS();
	}

	/** Init chart */
	initChartJS() {
		// For more information about the chartjs, visit this link
		// https://www.chartjs.org/docs/latest/getting-started/usage.html

		const chart = new Chart(this.chart.nativeElement, {
			type: 'doughnut',
			data: this.data,
			options: {
				title: {
					display: false,
				},
				cutoutPercentage: 80,
				tooltips: {
					intersect: false,
					mode: 'nearest',
					xPadding: 10,
					yPadding: 10,
					caretPadding: 10
				},
				legend: {
					display: false
				},
				// responsive: true,
				// maintainAspectRatio: false,
				// barRadius: 4,
				// scales: {
				// 	xAxes: [{
				// 		display: false,
				// 		gridLines: false,
				// 		stacked: true
				// 	}],
				// 	yAxes: [{
				// 		display: false,
				// 		stacked: true,
				// 		gridLines: false
				// 	}]
				// },
				// layout: {
				// 	padding: {
				// 		left: 0,
				// 		right: 0,
				// 		top: 0,
				// 		bottom: 0
				// 	}
				// }
			}
		});
	}

}
