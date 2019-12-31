import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DxDataGridComponent } from "devextreme-angular";

import {
  CampusManagementService
} from "./../../../../shared/Services/campus-management.service";
import { Campusmodel } from "./../../../../shared/models/campusmodel";
import { confirm } from 'devextreme/ui/dialog';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CampusUpdateComponent } from './campus-update/campus-update.component';


@Component({
  selector: "kt-campus-management",
  templateUrl: "./campus-management.component.html",
  styleUrls: ["./campus-management.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CampusManagementComponent implements OnInit {
  @ViewChild('Campusgrid', { static: false }) CampusGrid: DxDataGridComponent;

  dataSource: Campusmodel[];
  campusObj = new Campusmodel();
  updatecampusObj = new Campusmodel();
  SelectedRowsData: any[] = [];
  selectedItemKeys: any[] = [];
  showDragIcons: boolean;
  private deleteCampuses: Subscription;


  constructor(private httpClient: HttpClient, private service: CampusManagementService, private modalService: NgbModal ) {
    this.showDragIcons = true;
    this.onReorder = this.onReorder.bind(this);
  }
  ngOnInit() {
    this.getCampusData();
  }

  getCampusData() {
    console.log('getCampusData');
    this.dataSource = [];
    this.service.getCampus().subscribe(data => {
      this.dataSource = data;
      this.CampusGrid.instance.refresh();
    });
  }

  onReorder(e) {
    var visibleRows = e.component.getVisibleRows(),
      toIndex = this.dataSource.indexOf(visibleRows[e.toIndex].data),
      fromIndex = this.dataSource.indexOf(e.itemData);
    this.dataSource.splice(fromIndex, 1);
    this.dataSource.splice(toIndex, 0, e.itemData);

    this.updatecampusObj = e.itemData;
    console.log('onReorder', this.updatecampusObj);
    this.updatecampusObj.displayOrder = toIndex;

    this.service
      .putCampus(this.updatecampusObj, this.updatecampusObj.campusId)
      .subscribe(
        success => {
          console.log("Campus Updated", true);
          this.CampusGrid.instance.refresh();
        },
        error => {
          console.log("Campus Updated", false);
        }
      );
  }

  onSelection(data: any) {
    this.SelectedRowsData = data.selectedRowsData;
    this.selectedItemKeys = data.selectedRowKeys;
  }

  deleteRecords() {
    var response = confirm("Are you sure you want to delete?", "Confirm");
    response.then((dialogResult) => {
      if (dialogResult) {
        this.onConfirmDelete();
      }
    });
  }

  onConfirmDelete() {
    this.SelectedRowsData.forEach((item) => {
      this.deleteCampuses = this.service.deleteCampus(item.campusId).subscribe(success => {
        console.log("removed Campus", true);
        this.getCampusData();
      },
        error => {
          console.log("removed Campus", false);
        }
      );
    });


  }



  OnCampusInserting(e) {
    this.campusObj.campusName = e.data.campusName;
    this.campusObj.clientId = 2;
    this.campusObj.districtId = 2;
    this.campusObj.accountCode = e.data.accountCode;
    this.campusObj.displayOrder = 0;
    this.campusObj.createdById = 1;
    this.campusObj.createdDate = new Date();
    this.campusObj.modifiedById = 2;
    this.campusObj.modifiedDate = new Date();
    this.campusObj.campusIsDeleted = false;

    this.service.postCampus(this.campusObj).subscribe(
      success => {
        console.log("Campus Added", true);
        this.getCampusData();
        this.CampusGrid.instance.refresh();
      },
      error => {
        console.log("Campus Added", false);
      }
    );
  }

  onCampusUpdating(e) {
    console.log('onRowUpdating', e);
    this.updatecampusObj.campusId = e.oldData.campusId;
    this.updatecampusObj.campusName = e.newData.campusName ? e.newData.campusName : e.oldData.campusName;
    this.updatecampusObj.accountCode = e.newData.accountCode ? e.newData.accountCode : e.oldData.accountCode;
    this.updatecampusObj.clientId = 2;
    this.updatecampusObj.districtId = 2;
    this.updatecampusObj.displayOrder =  e.newData.displayOrder ? e.newData.displayOrder : e.oldData.displayOrder;
    this.updatecampusObj.createdById = 1;
    this.updatecampusObj.createdDate = new Date();
    this.updatecampusObj.modifiedById = 2;
    this.updatecampusObj.modifiedDate = new Date();
    this.updatecampusObj.campusIsDeleted = false;

    console.log('onRowUpdatingData', this.updatecampusObj);
    this.service.putCampus(this.updatecampusObj, e.oldData.campusId)
      .subscribe(
        success => {
          console.log("Campus Updated", true);
          this.CampusGrid.instance.refresh();
          this.getCampusData();
        },
        error => {
          console.log("Campus Updated", false);
        }
      );
  }

  openLarge() {
    this.modalService.open(CampusUpdateComponent, {
      size: 'lg'
    });
  }


  onCampusContentReady(e) {
    e.component.option("loadPanel.enabled", true);
  }
}
