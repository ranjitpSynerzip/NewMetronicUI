import { Campusmodel } from "./../../../shared/models/campusmodel";
import { CampusManagementService } from "./../../../shared/Services/campus-management.service";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { confirm } from "devextreme/ui/dialog";
import { Subscription } from "rxjs";

@Component({
	selector: "kt-campus",
	templateUrl: "./campus.component.html",
	styleUrls: ["./campus.component.scss"]
})
export class CampusComponent implements OnInit {
	dataSource: Campusmodel[];
	campusObj = new Campusmodel();
	private deleteCampuses: Subscription;

	selectedItemKeys: any[] = [];
	SelectedRowsData: any[] = [];

	constructor(
		private httpClient: HttpClient,
		private service: CampusManagementService
	) {}

	ngOnInit() {
		this.dataSource = [];
		this.service.getCampus().subscribe(data => {
			this.dataSource = data;
		});
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
		this.campusObj.displayOrder = 1;
		this.campusObj.createdBy = 1;
		this.campusObj.createdDate = "2019-12-23T12:39:20.923";
		this.campusObj.modifiedBy = 2;
		this.campusObj.modifiedDate = "2019-12-23T12:39:20.923";
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