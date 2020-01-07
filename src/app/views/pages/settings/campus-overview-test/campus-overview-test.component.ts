import { Component, OnInit } from '@angular/core';
import { CampusManagementService, BudgetSummary } from '../../../../shared/Services/campus-management.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-campus-overview-test',
  templateUrl: './campus-overview-test.component.html',
  styleUrls: ['./campus-overview-test.component.scss']
})
export class CampusOverviewTestComponent implements OnInit {
  budgetSummary: BudgetSummary[];
  menuItems: any;
  campusId: number;
  projectId: number;


  ContextMenuItems = {
    New_Project: 'New Project',
    Add_Note: 'Add Note',
    New_Minutes: 'New Minutes',
    Edit_Campus: 'Edit Campus',
    Delete_Campus: 'Delete Campus',
  };

  constructor(service: CampusManagementService, private router: Router, private route: ActivatedRoute) {
    this.budgetSummary = service.getBudgetSummary();

    this.menuItems = [{
      text: this.ContextMenuItems.New_Project
    },
    { text: this.ContextMenuItems.Add_Note },
    { text: this.ContextMenuItems.New_Minutes },
    { text: this.ContextMenuItems.Edit_Campus },
    { text: this.ContextMenuItems.Delete_Campus }
    ];
  }

  ngOnInit() {
  }

  addMenuItems(e) {
    console.log('addMenuItems', e);
    this.menuItems = [];
    if (e.row.data.campusId !== 0) {
      this.campusId = e.row.data.campusId;
      this.menuItems = [
        { text: this.ContextMenuItems.New_Project, campusId: this.campusId },
        { text: this.ContextMenuItems.Edit_Campus },
        { text: this.ContextMenuItems.Delete_Campus },
      ];
    }
    if (e.row.data.ProjectId !== 0) {
      this.menuItems = [];
      this.menuItems = [
        { text: this.ContextMenuItems.Add_Note },
        { text: this.ContextMenuItems.New_Minutes },
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
    console.log('itemClick', e);
    if (!e.itemData.items) {
      // alert("The \"" + e.itemData.text + "\" item was clicked");

      switch (e.itemData.text) {
        case this.ContextMenuItems.New_Project:
          this.router.navigate(['projects/addproject']);
          // this.router.navigate([url, id])
          // router.navigate(['team', 33, 'user', 11], {relativeTo: route});
          break;
        case this.ContextMenuItems.Add_Note:
          this.router.navigateByUrl('devgrid');
          break;
        case this.ContextMenuItems.Edit_Campus:
          this.router.navigateByUrl('devgrid');
          break;
        case this.ContextMenuItems.Delete_Campus:
          this.router.navigateByUrl('devgrid');
          break;
        case this.ContextMenuItems.New_Minutes:

          break;
        default:

      }
    }
  }

}
