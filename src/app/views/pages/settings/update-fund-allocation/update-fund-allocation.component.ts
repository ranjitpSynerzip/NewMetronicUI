import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FundAllocationService } from '../../../../shared/Services/fund-allocation.service';
import { HttpClient } from '@angular/common/http';
import { DxPivotGridComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

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

  PopupVisible = false;
  PopupTitle = '';
  CellValue = '';
  seriseAmount = '';
  seriseName = '';
  fundName = '';
  campusName = '';


  constructor(private httpClient: HttpClient, private service: FundAllocationService) {
    this.subscription = this.service.getfundAllocation().subscribe(
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
            summaryType:"sum",
            format: "currency",
            area: "data",
          },
          ],
          store: this.serviceData,
        };

      })



  }

  ngOnInit() {

  }


  onCellClick(e) {
    console.log('onCellClick', e)
    if (e.area == "data") {
      var rowPathLength = e.cell.rowPath.length,
        rowPathName = e.cell.rowPath[rowPathLength - 1];
      console.log('campus', rowPathName);
      console.log('Fund', e.cell.columnPath[0]);
      console.log('serise', e.cell.columnPath[1]);

      this.campusName = rowPathName;
      this.fundName = e.cell.columnPath[0];
      this.seriseName = e.cell.columnPath[1];
      // console.log('e.cell', e.cell);
      this.CellValue = e.cell.value;
      this.PopupTitle = 'Serise Amount';
      this.PopupVisible = true;
    }
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
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
      success => { console.log('updateseriesdetailamount'); },
      error => { console.log('error'); }
    )
  }

}
