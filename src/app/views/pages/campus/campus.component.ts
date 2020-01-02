import { Campusgridmodel, Campusmodel } from "./../../../shared/models/campusmodel";
import { CampusManagementService } from "./../../../shared/Services/campus-management.service";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { confirm } from "devextreme/ui/dialog";
import { Subscription } from "rxjs";
import { HeaderTitleService } from '../../../shared/Services/header-title.service';

@Component({
	selector: "kt-campus",
	templateUrl: "./campus.component.html",
	styleUrls: ["./campus.component.scss"]
})
export class CampusComponent implements OnInit {
	dataSource: Campusgridmodel[];
	campusObj = new Campusmodel();
	private deleteCampuses: Subscription;

	selectedItemKeys: any[] = [];
	SelectedRowsData: any[] = [];

	constructor(
		private httpClient: HttpClient,
		private service: CampusManagementService,
		private headerTitleService: HeaderTitleService,

	) {}

	ngOnInit() {
		this.dataSource = [];
		this.service.getCampuswithdetails().subscribe(data => {
			this.dataSource = data;
		});

		this.headerTitleService.updatetitle('Campuses');
	}

	selectionChanged(data: any) {
		this.SelectedRowsData = data.selectedRowsData;
		this.selectedItemKeys = data.selectedRowKeys;
	}

	deleteRecords() {
		var result = confirm("Are you sure you want to delete?", "Confirm");
		result.then(dialogResult => {
			if (dialogResult) {
				this.ConfirmDelete();
			}
		});
	}

	ConfirmDelete() {
		this.SelectedRowsData.forEach(item => {
			this.deleteCampuses = this.service
				.deleteCampus(item.campusId)
				.subscribe(
					success => {
						console.log("removed Campus", true);
					},
					error => {
						console.log("removed Campus", false);
					}
				);
		});
	}

	OnRowInserting(e) {
		this.campusObj.campusName = e.data.campusName;
		this.campusObj.clientId = 2;
		this.campusObj.districtId = 2;
		this.campusObj.accountCode = e.data.accountCode;
		this.campusObj.displayOrder = 0;
		this.campusObj.createdBy = 1;
		this.campusObj.createdDate = new Date();
		this.campusObj.modifiedBy = 2;
		this.campusObj.modifiedDate = new Date();
		this.campusObj.isDeleted = false;

		this.service.postCampus(this.campusObj).subscribe(
			success => {
				console.log("Campus Added", true);
			},
			error => {
				console.log("Campus Added", false);
			}
		);
	}
}
