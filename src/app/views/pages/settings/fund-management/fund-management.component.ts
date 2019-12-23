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
    this.userObj.id =this.userInfo.id;
  
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
    return {
      store: AspNetData.createStore({
        loadUrl: this.url + '/Series/' + id,
      })
    };
    
  }

  selectionChanged(data: any) {
    this.SelectedRowsData = data.selectedRowsData;
    this.selectedItemKeys = data.selectedRowKeys;
  }



  deleteRecords() {
    this.SelectedRowsData.forEach((item) => {
      if (item.fundSourceId) {
        this.service.deletefundSeries(item.id).subscribe(success => {
          console.log('removed Fund', true);
        },
          error => {
            console.log('removed Fund', false);
          });
      } else {
        this.service.deletefundsource(item.id).subscribe(success => {
          console.log('removed Fund', true);
        },
          error => {
            console.log('removed Fund', false);
          });
      }
    });

    this.dataGrid.instance.refresh();
    this.refreshgrid();
    this.loadfundSerise();
  }

  OnRowInserting(e) {

    this.fundSourceObj = e.data;
    this.fundSourceObj.fundName = e.data.name;
    this.fundSourceObj.createdBy = 18;
    this.fundSourceObj.isDeleted = false;
    // this.fundSourceObj. = e.data.displayName;
    this.fundSourceObj.createdDate = e.data.createdDate;

    this.service.postfundsource(this.fundSourceObj).subscribe(success => {
      console.log('fund Source Added', true);
    },
      error => {
        console.log('fund Source Added', false);
      })
  }

  onRowUpdating(e) {

    this.updatefundSourceObj = e.key;
    this.updatefundSourceObj = e.oldData;
    this.updatefundSourceObj.fundName = e.newData.fundName ? e.newData.fundName : e.oldData.fundName;
    this.updatefundSourceObj.fundCode = e.newData.fundCode ? e.newData.fundCode : e.oldData.fundCode;

    this.service.putfundsource(this.updatefundSourceObj, e.key.id).subscribe(success => {
      console.log('fund Source Updated', true);
    },
      error => {
        console.log('fund Source Updated', false);
      })
  }


  OnRowInsertingFundSeries(e) {
  

    this.fundSeriseObj.seriesName = e.data.seriesName;
    this.fundSeriseObj.districtId = 2;
    this.fundSeriseObj.fundId = e.data.fundId;
    this.fundSeriseObj.seriesAamount = e.data.seriesAamount;
    this.fundSeriseObj.seriesCamount =  e.data.seriesCamount;
    this.fundSeriseObj.acctCode =  e.data.acctCode;
    this.fundSeriseObj.startDate =  e.data.startDate;
    this.fundSeriseObj.endDate =  e.data.endDate;
    this.fundSeriseObj.createdBy = 18;
    this.fundSeriseObj.createdDate = new Date();
    this.fundSeriseObj.modifiedBy =  e.data.modifiedBy;
    this.fundSeriseObj.modifiedDate =  e.data.modifiedDate;
    this.fundSeriseObj.isDeleted = false;
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
    this.updatefundSeriseObj.acctCode = e.newData.acctCode ?  e.newData.acctCode : e.oldData.acctCode;
    this.updatefundSeriseObj.startDate = e.newData.startDate ?  e.newData.startDate : e.oldData.startDate;
    this.updatefundSeriseObj.endDate = e.newData.endDate ? e.newData.endDate : e.oldData.endDate;
    this.updatefundSeriseObj.createdBy = e.newData.createdBy ? e.newData.createdBy : e.oldData.createdBy;
    this.updatefundSeriseObj.createdDate = e.newData.createdDate ? e.newData.createdDate : e.oldData.createdDate;
    this.updatefundSeriseObj.modifiedBy = this.userObj.id;
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
    this.fundSourceid = e.key.id;
    this.fundSeriseDataSource = [];

    // this.service.getfundSeriesById(e.key.id).subscribe(
    //   data => (this.fundSeriseDataSource = data)
    // );

    this.loadfundSerise();
  }

  onContentReady(e) {
    e.component.option("loadPanel.enabled", false);
  }


  loadfundSerise() {
    let server = this.dataSource.find(x => x.fundId === this.fundSourceid);
    return this.fundSeriseDataSource = server.series;
  }


}
