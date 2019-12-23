import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxDataGridModule,
	DxDataGridComponent,
	DxButtonModule } from 'devextreme-angular';
import { CampusManagementService, Campus } from './../../../../shared/Services/campus-management.service';
import ArrayStore from 'devextreme/data/array_store'


@Component({
  selector: 'kt-campus-management',
  templateUrl: './campus-management.component.html',
  styleUrls: ['./campus-management.component.scss'],
  providers: [CampusManagementService]
})
export class CampusManagementComponent{

	@ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
    dataSource: ArrayStore;
	selectedItemKeys: any[] = [];
	showDragIcons: boolean;
	campus: Array<Campus>

  constructor(service: CampusManagementService) {
	// this.dataSource = new ArrayStore({
	// 	key: "ID",
	// 	data: service.getCampuses()
	// });
	this.campus = service.getCampuses();
	this.showDragIcons = true;
	this.onReorder = this.onReorder.bind(this);

   }

   onReorder(e) {
	var visibleRows = e.component.getVisibleRows(),
		toIndex = this.campus.indexOf(visibleRows[e.toIndex].data),
		fromIndex = this.campus.indexOf(e.itemData);

	this.campus.splice(fromIndex, 1);
	this.campus.splice(toIndex, 0, e.itemData);
}

   selectionChanged(data: any) {
	this.selectedItemKeys = data.selectedRowKeys;
}

deleteRecords() {
	this.selectedItemKeys.forEach((key) => {
		this.dataSource.remove(key);
	});
	this.dataGrid.instance.refresh();
}
}
@NgModule({
	imports: [BrowserModule]
})
export class AppModule {}
