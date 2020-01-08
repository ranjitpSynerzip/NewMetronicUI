import { Component, OnInit, ElementRef, Input, ViewChild } from "@angular/core";
import { LayoutConfigService } from "../../../../core/_base/layout/services/layout-config.service";

@Component({
  selector: 'kt-doughnutchart-widget',
  templateUrl: './doughnutchart-widget.component.html',
  styleUrls: ['./doughnutchart-widget.component.scss']
})
export class DoughnutchartWidgetComponent implements OnInit {

	@Input() title: string;
	@Input() desc: string;
	@Input() data: { labels: string[]; datasets: any[] };
	@ViewChild("chart", { static: true }) chart: ElementRef;

	constructor(private layoutConfigService: LayoutConfigService) {}

  ngOnInit() {
	if (!this.data) {
		this.data = {
			labels: this.data.labels,
			datasets: [
				{
					data: this.data.datasets,

					backgroundColor: [
						"#6277FE",
						"#4BC0A4",
						"#F53392",
					],
				}
			]
		};
	}

	this.initChartJS();
  }

  initChartJS() {
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
		}
	});
}

}
