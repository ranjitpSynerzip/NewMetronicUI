import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FundAllocationService } from '../../../../shared/Services/fund-allocation.service';
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { HttpClient } from '@angular/common/http';
import { DxPivotGridComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';
import { FundemitterService } from '../../../../shared/Services/fundemitter.service';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'kt-fund-allocation',
  templateUrl: './fund-allocation.component.html',
  styleUrls: ['./fund-allocation.component.scss']
})
export class FundAllocationComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @ViewChild('FundsAllocationGrid', { static: false }) pivotGrid: DxPivotGridComponent;

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

  PopupVisible = false;
  PopupTitle = '';
  CellValue = '';
  seriseAmount = '';
  seriseName = '';
  fundName = '';
  campusName = '';

  constructor(private httpClient: HttpClient, private service: FundAllocationService, private fundemmiter: FundemitterService) {

  }

  ngOnInit() {
    this.getFundAllocation();
    if (this.fundemmiter.subsVar == undefined) {
      this.fundemmiter.subsVar = this.fundemmiter.invokeComponentFunction.subscribe((name: string) => {
        this.getFundAllocation();
      });
    }
  }

  getFundAllocation() {
    console.log('getFundAllocation');
    this.service.getfundAllocation().subscribe(
      data => {
        this.serviceData = data;
        this.pivotGridDataSource = {

          fields: [{
            caption: "Campus",
            dataField: "campusName",
            area: "row"
          }, {
            caption: "Source",
            dataField: "fundName",
            dataType: "string",
            area: "column"
          },
          {
            caption: "Serise",
            dataField: "seriesName",
            dataType: "string",
            area: "column"
          }, {
            dataField: "seriesDetailAamount",
            dataType: "number",
            format: "currency",
            summaryType: "sum",
            area: "data",
          }],
          store: this.serviceData,
        };
      });
  }

  onCellClick(e) {
    console.log('onCellClick', e)
    if (e.area == "data" && e.cell.columnPath.length > 1 && e.cell.rowType !== 'GT') {
      var rowPathLength = e.cell.rowPath.length,
        rowPathName = e.cell.rowPath[rowPathLength - 1];
      this.campusName = rowPathName;
      this.fundName = e.cell.columnPath[0];
      this.seriseName = e.cell.columnPath[1];
      this.CellValue = e.cell.value;
      this.PopupTitle = 'Update Amount';
      this.PopupVisible = true;
    }
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


  onSubmit(form) {
    console.log(form.value);
    this.seriseAmount = (Object.values(form.value).toLocaleString());
    this.PopupVisible = false;
    this.service.updateseriesdetailamount(this.seriseAmount, this.seriseName, this.fundName, this.campusName).subscribe(
      success => {
        console.log('updateseriesdetailamount');
       // this.getFundAllocation();
        this.fundemmiter.onSaveOnUpdate();
      },
      error => { console.log('error'); }
    );
  }


  // onContentFundAllocationReady(e) {
  //   e.component.option("loadPanel.enabled", true);
  // }


}
