import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DxDataGridComponent } from 'devextreme-angular';
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { FundManagementService, Funds } from '../../../../shared/Services/fund-management.service';
import { FundsourceModel } from '../../../../shared/models/fund-source.model';
import { environment } from '../../../../../environments/environment';
import { FundSeriesModel } from '../../../../shared/models/fund-series.model';
import { User } from '../../../../core/auth';



@Component({
  selector: 'kt-fund-management',
  templateUrl: './fund-management.component.html',
  styleUrls: ['./fund-management.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FundManagementComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  dataSource: Funds[];
  fundSeriseDataSource: FundSeriesModel[];
  fundSourceObj = new FundsourceModel();
  insertfundSourceObj = new Funds();
  updatefundSourceObj = new Funds();
  fundSeriseObj = new FundSeriesModel();
  updatefundSeriseObj = new FundSeriesModel();
  url = environment.baseUrl;
  masterDetailDataSource: any;
  SelectedRowsData: any[] = [];
  selectedItemKeys: any[] = [];
  serises: any[];
  fundSourceid = 0;
  userInfo: any;
  userObj = new User();
 // loadIndicatorVisible = true;
 

  constructor(private httpClient: HttpClient, private service: FundManagementService) {
  }


  ngOnInit() {
    this.refreshgrid();
    this.userInfo = JSON.parse(localStorage.getItem("user"));
    this.userObj.fullname = this.userInfo.displayName;
    this.userObj.id = this.userInfo.id;
  }

  refreshgrid() {
    this.service.getfundsource().subscribe(
      data => {
        this.dataSource = data;
      }
    );


    // this.dataSource = {
    //   key: "id",
    //   load: () => {
    //     return this.service.getfundsource().toPromise().then(result => {
    //       console.log('LOADED!');
    //       return result;
    //     });
    //   }
    // }
  }



  getMasterDetailGridDataSource(id: number): any {
    console.log('getMasterDetailGridDataSource', id);
    return {
      store: AspNetData.createStore({
        loadUrl: 'http://172.25.29.38:88/api/Series/fundid/' + id,
      })
    };
  }

  selectionChanged(data: any) {
    this.SelectedRowsData = data.selectedRowsData;
    this.selectedItemKeys = data.selectedRowKeys;
  }



  deleteRecords() {
    console.log('deleteRecords', this.SelectedRowsData);
    this.SelectedRowsData.forEach((item) => {
      if (item.seriesName) {
        this.service.deletefundSeries(item.seriesId).subscribe(success => {
          console.log('deletefundSeries', true);
        },
          error => {
            console.log('deletefundSeries', false);
          });
      } else {
        this.service.deletefundsource(item.fundId).subscribe(success => {
          console.log('deletefundsource', true);
        },
          error => {
            console.log('deletefundsource', false);
          });
      }
    });

    this.dataGrid.instance.refresh();
    this.refreshgrid();
    //this.loadfundSerise();
  }

  OnRowInserting(e) {
    this.insertfundSourceObj.fundName = e.data.fundName;
    this.insertfundSourceObj.fundCode = e.data.fundCode;
    this.insertfundSourceObj.districtId = 2;
    this.insertfundSourceObj.fundAamount = 0;
    this.insertfundSourceObj.fundCamount = 0;
    this.insertfundSourceObj.createdBy = 1;
    this.insertfundSourceObj.isDeleted = false;
    this.insertfundSourceObj.createdDate = new Date();
    this.insertfundSourceObj.modifiedBy = 1;
    this.insertfundSourceObj.modifiedDate = new Date();
    this.insertfundSourceObj.series = [];

    console.log('OnRowInserting',  this.insertfundSourceObj);
    this.service.postfundsource(this.insertfundSourceObj).subscribe(success => {
      console.log('fund Source Added', true);
    },
      error => {
        console.log('fund Source Added', false);
      })
  }

  onRowUpdating(e) {
   console.log('onRowUpdating', e);
    this.updatefundSourceObj = e.oldData;
    this.updatefundSourceObj.fundName = e.newData.fundName ? e.newData.fundName : e.oldData.fundName;
    this.updatefundSourceObj.fundCode = e.newData.fundCode ? e.newData.fundCode : e.oldData.fundCode;
    this.updatefundSourceObj.districtId = 2;
    this.updatefundSourceObj.fundAamount = 0;
    this.updatefundSourceObj.fundCamount = 0;
    this.updatefundSourceObj.createdBy = 1;
    this.updatefundSourceObj.isDeleted = false;
    this.updatefundSourceObj.createdDate = new Date();
    this.updatefundSourceObj.modifiedBy = 1;
    this.updatefundSourceObj.modifiedDate = new Date();
    this.updatefundSourceObj.series = [];

    this.service.putfundsource(this.updatefundSourceObj, e.key.fundId).subscribe(success => {
      console.log('fund Source Updated', true);
    },
      error => {
        console.log('fund Source Updated', false);
      })
  }


  OnRowInsertingFundSeries(e) {
    this.fundSeriseObj.seriesName = e.data.seriesName;
    this.fundSeriseObj.districtId = 2;
    this.fundSeriseObj.fundId =  this.fundSourceid ;
    this.fundSeriseObj.seriesAamount = 0;
    this.fundSeriseObj.seriesCamount =  0;
    this.fundSeriseObj.accountCode =  e.data.accountCode;
    this.fundSeriseObj.startDate =  e.data.startDate;
    this.fundSeriseObj.endDate =  e.data.endDate;
    this.fundSeriseObj.createdBy = 1;
    this.fundSeriseObj.createdDate = new Date();
    this.fundSeriseObj.modifiedBy =  1;
    this.fundSeriseObj.modifiedDate =  new Date();;
    this.fundSeriseObj.isDeleted = false;
    console.log('OnRowInsertingFundSeries', this.fundSeriseObj)
    this.service.postfundSeries(this.fundSeriseObj).subscribe(success => {
      console.log('fund Series Added', true);
    },
      error => {
        console.log('fund Series Added', false);
      })
  }


  onRowUpdatingFundSeries(e) {
    console.log('onRowUpdatingFundSeries', e.data);
    this.updatefundSeriseObj = e.oldData;
    this.updatefundSeriseObj.seriesName = e.newData.seriesName ? e.newData.seriesName : e.oldData.seriesName;
    this.updatefundSeriseObj.districtId = e.newData.districtId ? e.newData.districtId : e.oldData.districtId;
    this.updatefundSeriseObj.fundId = e.newData.fundId ? e.newData.fundId : e.oldData.fundId;
    this.updatefundSeriseObj.seriesAamount = e.newData.seriesAamount ? e.newData.seriesAamount : e.oldData.seriesAamount;
    this.updatefundSeriseObj.seriesCamount = e.newData.seriesCamount ? e.newData.seriesCamount : e.oldData.seriesCamount;
    this.updatefundSeriseObj.accountCode = e.newData.accountCode ?  e.newData.accountCode : e.oldData.accountCode;
    this.updatefundSeriseObj.startDate = e.newData.startDate ?  e.newData.startDate : e.oldData.startDate;
    this.updatefundSeriseObj.endDate = e.newData.endDate ? e.newData.endDate : e.oldData.endDate;
    this.updatefundSeriseObj.createdBy = e.newData.createdBy ? e.newData.createdBy : e.oldData.createdBy;
    this.updatefundSeriseObj.createdDate = e.newData.createdDate ? e.newData.createdDate : e.oldData.createdDate;
    this.updatefundSeriseObj.modifiedBy = 1;
    this.updatefundSeriseObj.modifiedDate =  new Date();
    this.updatefundSeriseObj.isDeleted = false;

    this.service.putfundSeries(this.updatefundSeriseObj, e.key.id).subscribe(success => {
      console.log('fund Source Updated', true);
    },
      error => {
        console.log('fund Source Updated', false);
      })
  }

  onRowExpanding(e) {
    e.component.collapseAll(-1);  //NP-789
    this.fundSourceid = e.key.fundId;
    console.log('onRowExpanding', this.fundSourceid );
    this.fundSeriseDataSource = [];

    this.service.getfundSeriesById(e.key.fundId).subscribe(
      data => (this.fundSeriseDataSource = data,
        console.log(this.fundSeriseDataSource))
    );

  // this.loadfundSerise();
  }

  onContentReady(e) {
    e.component.option("loadPanel.enabled", false);
  }


  // loadfundSerise() {
  //   let server = this.dataSource.find(x => x.fundId === this.fundSourceid);
  //   return this.fundSeriseDataSource = server.series;
  // }


}
