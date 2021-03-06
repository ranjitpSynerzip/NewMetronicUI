import {
  Component,
  OnInit,
  NgModule,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DxDataGridComponent } from "devextreme-angular";
// import * as AspNetData from "devextreme-aspnet-data-nojquery";
import {
  CampusManagementService,
  Campus
} from "./../../../../shared/Services/campus-management.service";
import { Campusmodel } from "./../../../../shared/models/campusmodel";
import { environment } from "../../../../../environments/environment";
import { User } from "../../../../core/auth";
import { confirm } from 'devextreme/ui/dialog';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CampusUpdateComponent } from './campus-update/campus-update.component';


@Component({
  selector: "kt-campus-management",
  templateUrl: "./campus-management.component.html",
  styleUrls: ["./campus-management.component.scss"],
  //   providers: [CampusManagementService]
  encapsulation: ViewEncapsulation.None
})
export class CampusManagementComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;
  dataSource: Campusmodel[];
  campusObj = new Campusmodel();
  updatecampusObj = new Campusmodel();
  // url = environment.baseUrl;
  SelectedRowsData: any[] = [];
  selectedItemKeys: any[] = [];
  showDragIcons: boolean;
  private deleteCampuses: Subscription;


  constructor(
    private httpClient: HttpClient,
    private service: CampusManagementService,
    private modalService: NgbModal,
  ) {
    this.showDragIcons = true;
    this.getData();
    this.onReorder = this.onReorder.bind(this);
  }
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataSource = [];
    this.service.getCampus().subscribe(data => {
      this.dataSource = data;
    });
  }

  onReorder(e) {
    var visibleRows = e.component.getVisibleRows(),
      toIndex = this.dataSource.indexOf(visibleRows[e.toIndex].data),
      fromIndex = this.dataSource.indexOf(e.itemData);
    this.dataSource.splice(fromIndex, 1);
    this.dataSource.splice(toIndex, 0, e.itemData);

    this.updatecampusObj = e.itemData;
    console.log(this.updatecampusObj);
    this.updatecampusObj.displayOrder = toIndex;

    this.service
      .putCampus(this.updatecampusObj, this.updatecampusObj.campusId)
      .subscribe(
        success => {
          console.log("Campus Updated", true);
        },
        error => {
          console.log("Campus Updated", false);
        }
      );
  }

  selectionChanged(data: any) {
    this.SelectedRowsData = data.selectedRowsData;
    this.selectedItemKeys = data.selectedRowKeys;
  }

  deleteRecords() {
    var result = confirm("Are you sure you want to delete?", "Confirm");
    result.then((dialogResult) => {
      if (dialogResult) {
        this.ConfirmDelete();
      }
    });
  }

  ConfirmDelete() {
    this.SelectedRowsData.forEach((item) => {
      this.deleteCampuses = this.service.deleteCampus(item.campusId).subscribe(success => {
        console.log("removed Campus", true);
        this.getData();
        //this.dataGrid.instance.refresh();
      },
        error => {
          console.log("removed Campus", false);
        }
      );
    });
    // this.dataGrid.instance.refresh();

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
        this.getData();
      },
      error => {
        console.log("Campus Added", false);
      }
    );
  }

  onRowUpdating(e) {
    this.updatecampusObj = e.oldData;
    this.updatecampusObj.campusName = e.newData.campusName
      ? e.newData.campusName
      : e.oldData.campusName;
    this.updatecampusObj.accountCode = e.newData.accountCode
      ? e.newData.accountCode
      : e.oldData.accountCode;
    //this.updatecampusObj.displayOrder = e.newData.accountCode ? e.newData.accountCode : e.oldData.accountCode;

    this.service
      .putCampus(this.updatecampusObj, e.oldData.campusId)
      .subscribe(
        success => {
          console.log("Campus Updated", true);
          this.getData();
        },
        error => {
          console.log("Campus Updated", false);
        }
      );
  }



  stop1() {
    return false;
  }

  openLarge() {
		this.modalService.open(CampusUpdateComponent, {
			size: 'lg'
		});
	}
}
