import { Component, OnInit } from '@angular/core';
import { CampusManagementService, BudgetSummary } from '../../../../shared/Services/campus-management.service';

@Component({
  selector: 'kt-campus-overview-test',
  templateUrl: './campus-overview-test.component.html',
  styleUrls: ['./campus-overview-test.component.scss']
})
export class CampusOverviewTestComponent implements OnInit {
  budgetSummary: BudgetSummary[];
  items1: any;
  constructor(service: CampusManagementService) {
    this.budgetSummary = service.getBudgetSummary();

    this.items1 = [{
      text: 'New Project',
  },
  { text: 'Add Note' },
  { text: 'New Minutes' },
  { text: 'Edit Campus' },
  { text: 'Delete Campus' }
];
  }

  ngOnInit() {
  }

  addMenuItems(e) {
    console.log('addMenuItems', e)
    if( e.row.data.campusId !== 0 ){
      this.items1 = [];
      this.items1 = [
        { text: 'New Project' },
        { text: 'Edit Campus' },
        { text: 'Delete Campus' },
    ];
    }
    if( e.row.data.ProjectId !== 0 ){
      this.items1 = [];
      this.items1 = [
        { text: 'Add Note' },
        { text: 'New Minutes' },
    ];
    }
    // if(e.rowType ==='data'){
    //   console.log('on data');
    // }
    // if(e.column.headerId === 'dx-col-1'){
    //   console.log('dx-col-1');
    //   e.items.push({
    //     text: 'Working',
    //     onItemClick: () => {
    //       console.log(e.column.caption);
    //     }
    //   });
    // }
    // // if (e.target === 'dx-col-1') {
    // //   // e.items can be undefined
    // //   if (!e.items) e.items = [];

    // //   // Add a custom menu item
    // //   e.items.push({
    // //     text: 'Log Column Caption',
    // //     onItemClick: () => {
    // //       console.log(e.column.caption);
    // //     }
    // //   });
    // // }
  }


  itemClick(e) {
    if (!e.itemData.items) {
        alert("The \"" + e.itemData.text + "\" item was clicked");
    }
  }

}
