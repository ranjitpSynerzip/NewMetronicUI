import {NgModule,Component,Pipe,PipeTransform,enableProdMode} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {DxDataGridModule,DxBulletModule,DxTemplateModule,DevExtremeModule} from "devextreme-angular";
import { DevgridService } from "./devgrid.service";
import { HttpClient} from "@angular/common/http";
import CustomStore from "devextreme/data/custom_store";
import { environment } from '../../../../environments/environment';


@Component({
	selector: "kt-dev-grid",
	templateUrl: "./dev-grid.component.html",
	styleUrls: ["./dev-grid.component.scss"],
	providers: [DevgridService]
})


export class DevGridComponent {

	dataSource: any = {};
	collapsed = false;
	contentReady = e => {
		if (!this.collapsed) {
			this.collapsed = true;
			e.component.expandRow(["EnviroCare"]);
		}
	};

	constructor(private httpClient: HttpClient) {
		this.dataSource = new CustomStore({
			load: function(loadOptions: any) {
				let apiURL = 'https://dev-newprompt-backend.azurewebsites.net' + '/budgetdetails/93';

				return httpClient
					.get(apiURL)
					.toPromise<any>()
					.then((data1: any) => {
						return {
							data: data1,
							totalCount: data1.length
						};
					})
					.catch(error => {
						throw "Data Loading Error";
					});
			}
		});
	}
}

@NgModule({
	imports: [BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule]
})
export class AppModule {}

/*   platformBrowserDynamic().bootstrapModule(AppModule);
 */
