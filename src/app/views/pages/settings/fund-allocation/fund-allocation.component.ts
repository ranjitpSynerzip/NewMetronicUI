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
    showTotalsPrior = true;
    rowsDataFieldArea = false;
    treeHeaderLayout = true;

  constructor(service: FundAllocationService) {
    this.pivotGridDataSource = {
      fields: [{
        caption: "Campus",
        dataField: "campus",
        area: "row"
      }, {
        caption: "Source",
        dataField: "fund",
        dataType: "string",
        area: "column"
      },
      {
        caption: "Serise",
        dataField: "serise",
        dataType: "string",
        area: "column"
      }, {
        dataField: "amount",
        dataType: "number",
        format: "currency",
        area: "data"
      }],
      store: service.getSales()
    };
  }

  ngOnInit() {
  }

}
