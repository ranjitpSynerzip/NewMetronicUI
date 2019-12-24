import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DxDataGridComponent } from 'devextreme-angular';
// import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { CampusManagementService, Campus } from './../../../../shared/Services/campus-management.service';
import { Campusmodel } from './../../../../shared/models/campusmodel';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../../core/auth';

// import { DxDataGridModule,
// 	DxDataGridComponent,
// 	DxButtonModule } from 'devextreme-angular';
// import ArrayStore from 'devextreme/data/array_store'


@Component({
  selector: 'kt-campus-management',
  templateUrl: './campus-management.component.html',
  styleUrls: ['./campus-management.component.scss'],
//   providers: [CampusManagementService]
})
export class CampusManagementComponent implements OnInit{

	@ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
	dataSource: Campusmodel[];
	campusObj = new Campusmodel();
	updatecampusObj = new Campusmodel();
	// url = environment.baseUrl;
	SelectedRowsData: any[] = [];
	  selectedItemKeys: any[] = [];
	  showDragIcons: boolean;
    // dataSource: ArrayStore;
	// selectedItemKeys: any[] = [];
	// showDragIcons: boolean;
	// campus: Array<Campus>

  constructor(private httpClient: HttpClient, private service: CampusManagementService) {
	this.showDragIcons = true;
	this.getdata();


   }
   ngOnInit() {
	this.getdata();
  }

  getdata(){
	this.service.getCampus().subscribe(
			data => {this.dataSource = data}
		  );
	}

   onReorder(e) {
	   debugger;
	var visibleRows = e.component.getVisibleRows();
	console.log(visibleRows);

		var toIndex = visibleRows[e.toIndex].data;
		console.log("toIndex", visibleRows[e.toIndex].data);
		var fromIndex = e.itemData;
		console.log("fromIndex", e.itemData);


	console.log("DataSource", this.dataSource);
	//visibleRows.splice(fromIndex, 1);
	//console.log("data 1", this.dataSource.splice(fromIndex, 1));
	//visibleRows.splice(toIndex, 0, e.itemData);
	//console.log("data 2", this.dataSource.splice(toIndex, 0, e.itemData));
}

   selectionChanged(data: any) {
	this.SelectedRowsData = data.selectedRowsData;
	this.selectedItemKeys = data.selectedRowKeys;
}

deleteRecords() {
    this.SelectedRowsData.forEach((item) => {
        this.service.deleteCampus(item.campusId).subscribe(success => {
          console.log('removed Campus', true);
        },
          error => {
            console.log('removed Campus', false);
          });
    });
    this.dataGrid.instance.refresh();
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

    this.service.postCampus(this.campusObj).subscribe(success => {
      console.log('Campus Added', true);
    },
      error => {
        console.log('Campus Added', false);
      })
  }

  onRowUpdating(e) {

  this.updatecampusObj = e.oldData;
  this.updatecampusObj.campusName = e.newData.campusName ? e.newData.campusName : e.oldData.campusName;
  this.updatecampusObj.accountCode = e.newData.accountCode ? e.newData.accountCode : e.oldData.accountCode;

  this.service.putCampus(this.updatecampusObj, e.oldData.campusId).subscribe(success => {
	console.log('Campus Updated', true);
  },
	error => {
	  console.log('Campus Updated', false);
	})
}

}

