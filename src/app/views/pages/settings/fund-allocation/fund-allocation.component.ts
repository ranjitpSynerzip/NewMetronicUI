import { Component, OnInit, ViewChild } from '@angular/core';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { FundAllocationService } from '../../../../shared/Services/fund-allocation.service';
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { HttpClient } from '@angular/common/http';
import { DxPivotGridComponent } from 'devextreme-angular';


@Component({
  selector: 'kt-fund-allocation',
  templateUrl: './fund-allocation.component.html',
  styleUrls: ['./fund-allocation.component.scss']
})
export class FundAllocationComponent implements OnInit {

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

  constructor(private httpClient: HttpClient, private service: FundAllocationService) {
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
            area: "data",
          }],
          store: this.serviceData,
        };

      })



    this.dataSource = {
      remoteOperations: true,
      store: AspNetData.createStore({
        key: "seriesDetaild",
        loadUrl: "http://172.25.29.38:88/api/SeriesDetails/fundallocation"
      }),
      fields: [{
        caption: "Campus",
        dataField: "campusName",
        sortBySummaryField: "seriesDetailAamount",
        sortBySummaryPath: [],
        sortOrder: "desc",
        area: "row"
      }, {
        caption: "fundName",
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
        caption: "seriesDetailAamount",
        dataField: "seriesDetailAamount",
        dataType: "number",
        format: "currency",
        area: "data",
      }, {
        caption: "Store",
        dataField: "StoreName"
      },]
    }
  }

  ngOnInit() {




  }


  onCellClick(e) {
   console.log(e);
  }



}
