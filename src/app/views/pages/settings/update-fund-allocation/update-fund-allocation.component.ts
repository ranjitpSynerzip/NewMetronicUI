import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DxPivotGridComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';
import { CampusManagementService } from '../../../../shared/Services/campus-management.service';

@Component({
  selector: 'kt-update-fund-allocation',
  templateUrl: './update-fund-allocation.component.html',
  styleUrls: ['./update-fund-allocation.component.scss']
})
export class UpdateFundAllocationComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  @ViewChild(DxPivotGridComponent, { static: false }) pivotGrid: DxPivotGridComponent;

  pivotGridDataSource: any;
  showTotalsPrior = true;
  rowsDataFieldArea = false;
  treeHeaderLayout = true;
  dataSource: any;
  serviceData: any;

  pivotSource: any;
  textBox: any;
  oldPadding: any;
  clickedRow: any;
  clickedColumn: any;


  constructor(private httpClient: HttpClient, private service: CampusManagementService) {
  }

  ngOnInit() {
    this.getFundAllocation();
  }

  getFundAllocation() {
    this.service.getcampsforgrid().subscribe(
      data => {
        this.serviceData = data;
        this.pivotGridDataSource = {

          fields: [{
            caption: "Campus",
            dataField: "campusName",
            area: "row"
          }, {
            caption: "seriesName",
            dataField: "seriesName",
            dataType: "string",
            area: "column"
          },
         {
            dataField: "amount",
            dataType: "number",
            format: "currency",
            summaryType: "sum",
            area: "data",
          }],
          store: this.serviceData,
        };
      });
  }



  ngOnDestroy() {
   // this.subscription.unsubscribe();
  }

  onPopupShown() {
    console.log();
  }

  updateMyValue(e) {
    console.log(e);
  };



}
