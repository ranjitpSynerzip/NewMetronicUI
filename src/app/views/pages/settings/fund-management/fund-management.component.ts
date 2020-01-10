import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener, Inject, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DxDataGridComponent } from 'devextreme-angular';
import { DatePipe } from '@angular/common';
import { FundManagementService, Funds } from '../../../../shared/Services/fund-management.service';
import { FundsourceModel } from '../../../../shared/models/fund-source.model';
import { environment } from '../../../../../environments/environment';
import { FundSeriesModel } from '../../../../shared/models/fund-series.model';
import { User } from '../../../../core/auth';
import { confirm } from 'devextreme/ui/dialog';
import { Subscription } from 'rxjs';
import { FundemitterService } from '../../../../shared/Services/fundemitter.service';


@Component({
  selector: 'kt-fund-management',
  templateUrl: './fund-management.component.html',
  styleUrls: ['./fund-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [DatePipe]
})

export class FundManagementComponent implements OnInit {
  @ViewChild('Fundgrid', { static: false }) dataGrid: DxDataGridComponent;
  @ViewChild('fundSeries', { static: false }) fundSeriesGrid: DxDataGridComponent;

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
  private deletefundSeriesSubs: Subscription;
  private deletefundsourceSubs: Subscription;

  constructor(private httpClient: HttpClient, private service: FundManagementService, private fundemitter: FundemitterService, public datepipe: DatePipe) {

  }


  ngOnInit() {
    this.refreshgrid();
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.userObj.fullname = this.userInfo.displayName;
    this.userObj.id = this.userInfo.id;
  }

  refreshgrid() {
    console.log('refreshgrid');
    this.dataSource = [];
    this.service.getfundsource().subscribe(
      data => {
        this.dataSource = data;
        this.dataGrid.instance.refresh();
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



  // getMasterDetailGridDataSource(id: number): any {
  //   console.log('getMasterDetailGridDataSource', id);
  //   return {
  //     store: AspNetData.createStore({
  //       loadUrl: 'http://172.25.29.38:88/api/Series/fundid/' + id,
  //     })
  //   };
  // }

  selectionChanged(data: any) {
    console.log('selectionChanged');
    this.SelectedRowsData = data.selectedRowsData;
    this.selectedItemKeys = data.selectedRowKeys;
  }



  deleteRecords() {
    var result = confirm('Are you sure you want to delete?', 'Confirm');
    result.then((dialogResult) => {
      if (dialogResult) {
        this.ConfirmDelete();
      }
    });
  }

  ConfirmDelete() {
    console.log('deleteRecords', this.SelectedRowsData);
    this.SelectedRowsData.forEach((item) => {
      if (item.seriesName) {
        this.deletefundSeriesSubs = this.service.deletefundSeries(item.seriesId).subscribe(success => {
          console.log('deletefundSeries', true);
          this.loadfundSerise();
          this.fundSeriesGrid.instance.refresh();
          this.fundemitter.onSaveOnUpdate();
        },
          error => {
            console.log('deletefundSeries', false);
          });
      } else {
        this.deletefundsourceSubs = this.service.deletefundsource(item.fundId).subscribe(success => {
          console.log('deletefundsource', true);
          this.dataGrid.instance.repaint();
          this.dataGrid.instance.collapseAll(-1);
          this.refreshgrid();
          // this.dataGrid.instance.refresh();
          this.fundemitter.onSaveOnUpdate();
        },
          error => {
            console.log('deletefundsource', false);
          });
      }

    });


    // this.loadfundSerise();
    // this.deletefundSeriesSubs.unsubscribe();
    // this.deletefundsourceSubs.unsubscribe();

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

    console.log('OnRowInserting', this.insertfundSourceObj);
    this.service.postfundsource(this.insertfundSourceObj).subscribe(success => {
      console.log('fund Source Added', true);
      this.dataGrid.instance.refresh();
      this.refreshgrid();


    },
      error => {
        console.log('fund Source Added', false);
      })
  }

  onRowUpdating(e) {
    console.log('onRowUpdating', e);
    // this.updatefundSourceObj = e.oldData;
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
      this.dataGrid.instance.refresh();
      this.refreshgrid();
    },
      error => {
        console.log('fund Source Updated', false);
      })
  }


  OnRowInsertingFundSeries(e) {
    this.fundSeriseObj.seriesName = e.data.seriesName;
    this.fundSeriseObj.districtId = 2;
    this.fundSeriseObj.fundId = this.fundSourceid;
    this.fundSeriseObj.seriesAamount = 0;
    this.fundSeriseObj.seriesCamount = 0;
    this.fundSeriseObj.accountCode = e.data.accountCode;
    this.fundSeriseObj.startDate = e.data.startDate;
    this.fundSeriseObj.endDate = e.data.endDate;
    this.fundSeriseObj.createdBy = 1;
    this.fundSeriseObj.createdDate = new Date();
    this.fundSeriseObj.modifiedBy = 1;
    this.fundSeriseObj.modifiedDate = new Date();;
    this.fundSeriseObj.isDeleted = false;
    console.log('OnRowInsertingFundSeries', this.fundSeriseObj)
    this.service.postfundSeries(this.fundSeriseObj).subscribe(success => {
      console.log('fund Series Added', true);
      //this.dataGrid.instance.refresh();
      this.fundSeriesGrid.instance.refresh();
      this.loadfundSerise();
      this.fundemitter.onSaveOnUpdate();
    },
      error => {
        console.log('fund Series Added', false);
      })
  }


  onRowUpdatingFundSeries(e) {
    console.log('onRowUpdatingFundSeries1', e);
    // this.updatefundSeriseObj = e.oldData;
    this.updatefundSeriseObj.seriesId = e.oldData.seriesId;
    this.updatefundSeriseObj.seriesName = e.newData.seriesName ? e.newData.seriesName : e.oldData.seriesName;
    this.updatefundSeriseObj.districtId = 2;
    this.updatefundSeriseObj.fundId = this.fundSourceid;
    this.updatefundSeriseObj.seriesAamount = e.newData.seriesAamount ? e.newData.seriesAamount : e.oldData.seriesAamount;
    this.updatefundSeriseObj.seriesCamount = e.newData.seriesCamount ? e.newData.seriesCamount : e.oldData.seriesCamount;
    this.updatefundSeriseObj.accountCode = e.newData.accountCode ? e.newData.accountCode : e.oldData.accountCode;
    this.updatefundSeriseObj.startDate = e.newData.startDate ? e.newData.startDate : e.oldData.startDate;
    this.updatefundSeriseObj.endDate = e.newData.endDate ? e.newData.endDate : e.oldData.endDate;
    this.updatefundSeriseObj.createdBy = e.newData.createdBy ? e.newData.createdBy : e.oldData.createdBy;
    this.updatefundSeriseObj.createdDate = e.newData.createdDate ? e.newData.createdDate : e.oldData.createdDate;
    this.updatefundSeriseObj.modifiedBy = 1;
    this.updatefundSeriseObj.modifiedDate = new Date();
    this.updatefundSeriseObj.isDeleted = false;

    console.log('onRowUpdatingFundSeries', this.updatefundSeriseObj);

    this.service.putfundSeries(this.updatefundSeriseObj, e.key.seriesId).subscribe(success => {
      console.log('fund Source Updated', true);
      // this.dataGrid.instance.refresh();
      this.loadfundSerise();
      this.fundSeriesGrid.instance.refresh();
      this.fundemitter.onSaveOnUpdate();
    },
      error => {
        console.log('fund Source Updated', false);
      })
  }

  onRowExpanding(e) {
    this.dataGrid.instance.repaint();
    this.dataGrid.instance.refresh();
    e.component.collapseAll(-1);  //NP-789
    // e.component.expandRow(this.selectedItemKeys[0]);
    this.fundSourceid = e.key.fundId;
    console.log('onRowExpanding', this.fundSourceid);
    // this.service.getfundSeriesByfundId(e.key.fundId).subscribe(
    //   data => (this.fundSeriseDataSource = data,
    //     console.log(this.fundSeriseDataSource))
    // );

    this.loadfundSerise();
  }

  onContentReady(e) {
    e.component.option('loadPanel.enabled', true);
  }

  onMasterdetailReady(e) {
    e.component.option('loadPanel.enabled', true);
  }


  loadfundSerise() {
    // let server = this.dataSource.find(x => x.fundId === this.fundSourceid);
    // return this.fundSeriseDataSource = server.series;
    console.log('loadfundSerise');
    this.fundSeriseDataSource = [];
    this.service.getfundSeriesByfundId(this.fundSourceid).subscribe(
      data => {
        this.fundSeriseDataSource = data;
        this.fundSeriesGrid.instance.refresh();
      }
    );
  }


  onRowValidating(e) {
   // console.log('onload', e);
    if (e.oldData) {
     // console.log('onRowValidating', e.oldData);

      if (e.newData.startDate) {
       // console.log('New startDate', this.dateFormat(e.newData.startDate), this.dateFormat(e.oldData.endDate) );
        e.isValid = this.dateFormat(e.oldData.endDate) > this.dateFormat(e.newData.startDate);
      }

      if (e.newData.endDate) {
       // console.log('New endDate', this.dateFormat(e.oldData.startDate), this.dateFormat(e.newData.endDate));
        e.isValid = this.dateFormat(e.newData.endDate) > this.dateFormat(e.oldData.startDate);
      }

    } else {
      e.isValid = this.dateFormat(e.newData.endDate) > this.dateFormat(e.newData.startDate);
    }

    if (!e.isValid) {
      e.errorText = 'End date should be greater than start date';
    }

    const isSeriesNameExist = this.fundSeriseDataSource.find(({ seriesName }) => seriesName === e.newData.seriesName);
    if (isSeriesNameExist) {
      e.isValid = false;
      e.errorText = 'Series Name must be unique';
    }
  }

  dateFormat(datetoFormat) {
    return new Date(datetoFormat);
  }


  onFundgridValidating(e) {
    const isFundExist = this.dataSource.find(({ fundName }) => fundName === e.newData.fundName);
    if (isFundExist) {
      e.isValid = false;
      e.errorText = 'Fund Name must be unique';
    }
  }


  onFundgridEditorPreparing(e) {
    if (e.dataField === 'fundName') {
      e.editorOptions.maxLength = 20;
    }
    if (e.dataField === 'fundCode') {
      e.editorOptions.maxLength = 10;
    }
  }

  onfundSeriesEditorPreparing(e) {
    if (e.dataField === 'seriesName') {
      e.editorOptions.maxLength = 20;
    }
    if (e.dataField === 'accountCode') {
      e.editorOptions.maxLength = 10;
    }
  }

}
