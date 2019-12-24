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
    // dataSource: ArrayStore;
	// selectedItemKeys: any[] = [];
	// showDragIcons: boolean;
	// campus: Array<Campus>

  constructor(private httpClient: HttpClient, private service: CampusManagementService) {
	// this.dataSource = new ArrayStore({
	// 	key: "ID",
	// 	data: service.getCampuses()
	// });
	// this.campus = service.getCampuses();
	// this.showDragIcons = true;
	// this.onReorder = this.onReorder.bind(this);

   }
   ngOnInit() {
    // this.service.getCampus().subscribe(
	// 	data => (this.dataSource = data)
	//   );
  }

//    onReorder(e) {
// 	var visibleRows = e.component.getVisibleRows(),
// 		toIndex = this.campus.indexOf(visibleRows[e.toIndex].data),
// 		fromIndex = this.campus.indexOf(e.itemData);

// 	this.campus.splice(fromIndex, 1);
// 	this.campus.splice(toIndex, 0, e.itemData);
// }

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
	debugger;
    this.campusObj.campusName = e.data.campusName;
    this.campusObj.clientId = 2;
	this.campusObj.districtId = 2;
	this.campusObj.displayOrder = e.data.displayOrder;
	this.campusObj.createdBy = 1;
	this.campusObj.createdDate = "2019-12-23T12:39:20.923";
	this.campusObj.modifiedBy = 2;
	this.campusObj.modifiedDate = "2019-12-23T12:39:20.923";
	this.campusObj.isDeleted = false;

    // this.service.postCampus(this.campusObj).subscribe(success => {
    //   console.log('Campus Added', true);
    // },
    //   error => {
    //     console.log('Campus Added', false);
    //   })
  }

  onRowUpdating(e) {
debugger;
  this.updatecampusObj = e.oldData;
  this.updatecampusObj.campusName = e.newData.campusName ? e.newData.campusName : e.oldData.campusName;
  this.updatecampusObj.displayOrder = e.newData.displayOrder ? e.newData.displayOrder : e.oldData.displayOrder;

  this.service.putCampus(this.updatecampusObj, e.oldData.campusId).subscribe(success => {
	console.log('Campus Updated', true);
  },
	error => {
	  console.log('Campus Updated', false);
	})
}

}

