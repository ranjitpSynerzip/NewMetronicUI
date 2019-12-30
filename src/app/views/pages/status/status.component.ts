import {
	Component,
	OnInit
} from "@angular/core";
import { StatusService, Status } from "./status.service";
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';





@Component({
	selector: "kt-status",
	templateUrl: "./status.component.html",
	styleUrls: ["./status.component.scss"],
	providers: [StatusService]
})


export class StatusComponent implements OnInit {
	StatusModel = new Status();
	APIUrl = environment.baseUrl;
	frontendVersion = '';


	loader = true;
	constructor(private service: StatusService, private http: HttpClient) { }

	ngOnInit() {
		// this.service.getVersion().subscribe(data => {
		// 	this.frontendVersion = data;
		// });
		this.http.get('/assets/VERSION.txt', { responseType: 'text' }).subscribe(data => {
			this.frontendVersion = data;
		});

		this.service.getData().subscribe(data => {
			this.StatusModel = data;
			this.loader = false;
		});
	}
}


export class AppModule { }
