import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { LayoutConfigService } from '../../../../../core/_base/layout/services/layout-config.service';


@Component({
	selector: 'kt-barchart-widget',
	templateUrl: './barchart-widget.component.html',
	styleUrls: ['./barchart-widget.component.scss']
})
export class BarchartWidgetComponent implements OnInit {
	@Input() title: string;
	@Input() desc: string;
	@Input() data: { labels: string[]; datasets: any[] };
	@ViewChild('chart', { static: true }) chart: ElementRef;
	constructor(private layoutConfigService: LayoutConfigService) { }

	ngOnInit() {
		if (this.data) {
			this.initChartJS();
		}
	}

	/** Init chart */
	initChartJS() {
		const chart = new Chart(this.chart.nativeElement, {
			type: 'bar',
			data: {
				labels: this.data.labels,
				datasets: [
					{
						// label: 'dataset 1',
						backgroundColor: this.layoutConfigService.getConfig(
							'colors.state.success'
						),
						data: this.data.datasets
					}
				]
			},
			options: {
			title: {
				display: false
			},
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
