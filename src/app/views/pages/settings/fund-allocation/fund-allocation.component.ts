import { Component, OnInit } from '@angular/core';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { FundAllocationService } from '../../../../shared/Services/fund-allocation.service';

@Component({
  selector: 'kt-fund-allocation',
  templateUrl: './fund-allocation.component.html',
  styleUrls: ['./fund-allocation.component.scss']
})
export class FundAllocationComponent implements OnInit {

 pivotGridDataSource: any;
    showTotalsPrior = false;
    rowsDataFieldArea = false;
    treeHeaderLayout = true;

  constructor(service: FundAllocationService) {
    this.pivotGridDataSource = {
      fields: [{
        caption: "Region",
        dataField: "region",
        expanded: true,
        area: "row"
      }, {
        caption: "Country",
        dataField: "country",
        expanded: true,
        area: "row"
      }, {
        caption: "City",
        dataField: "city",
        area: "row"
      }, {
        dataField: "date",
        dataType: "date",
        area: "column"
      }, {
        caption: "Sales",
        dataField: "amount",
        dataType: "number",
        summaryType: "sum",
        format: "currency",
        area: "data"
      }, {
        caption: "Percent",
        dataField: "amount",
        dataType: "number",
        summaryType: "sum",
        summaryDisplayMode: "percentOfRowGrandTotal",
        area: "data"
      }],
      store: service.getSales()
    };
  }

  ngOnInit() {
  }

}
