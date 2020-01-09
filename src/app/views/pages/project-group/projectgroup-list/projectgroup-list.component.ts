import { ProjectGroupService } from './../../../../shared/Services/project-group.service';
import { ProjectgroupModel } from './../../../../shared/models/projectgroup-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../../../../shared/Services/project.service';
import { ProjectModel } from '../../../../shared/models/project-model.module';
import { confirm } from 'devextreme/ui/dialog';
import { Subscription } from 'rxjs';
import { DxDataGridComponent } from 'devextreme-angular';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'kt-projectgroup-list',
  templateUrl: './projectgroup-list.component.html',
  styleUrls: ['./projectgroup-list.component.scss']
})
export class ProjectgroupListComponent implements OnInit {

	@ViewChild('projects', { static: false }) dataGrid: DxDataGridComponent;
  dataSource: any[];
  baseUrl = environment.baseUrl;
  dapperUrl = environment.dapperUrl;
  // baseUrl = 'http://172.25.29.38:88/api';
  selectedItemKeys: any[] = [];
  SelectedRowsData: any[] = [];
  private deleteProjects: Subscription;
  //updateprojectObj = new ProjectModel();
  updateprojectObj = new ProjectgroupModel();
  Statues = [];
  contacts = [];
  companies = [];
  OrgCode = [
    { id: 1, name: 'Org Code 1' },
    { id: 2, name: 'Org Code 2' },
    { id: 3, name: 'Org Code 3' },
    { id: 4, name: 'Org Code 4' },
    { id: 5, name: 'Org Code 5' },
  ];

  constructor(private httpClient: HttpClient, private service: ProjectGroupService) {

    this.service.getStatus().subscribe(data => {
      this.Statues = data;
      console.log("statues", this.Statues);
    });

    this.service.getContacts().subscribe(data => {
      this.contacts = data;
      console.log('getContacts', this.contacts);
    });

    this.service.getCompanies().subscribe(data => {
      this.companies = data;
      console.log('getCompanies', this.companies);
    });

  }

  ngOnInit() {
    this.getAllProjectsGroups();
  }

  getAllProjectsGroups() {
    console.log('getAllProjects');
    this.httpClient.get(this.dapperUrl + '/ProjectGroup')
      .toPromise().then(res => this.dataSource = res as ProjectgroupModel[]);
    this.dataGrid.instance.refresh();
  }


  selectionChanged(data: any) {
    this.SelectedRowsData = data.selectedRowsData;
    this.selectedItemKeys = data.selectedRowKeys;
  }

  deleteRecords() {
    var result = confirm("Are you sure you want to delete?", "Confirm");
    result.then((dialogResult) => {
      if (dialogResult) {
        this.ConfirmDelete();
      }
    });
  }

  ConfirmDelete() {
    this.SelectedRowsData.forEach((item) => {
      this.deleteProjects = this.service.deleteProjectGroup(item.projectGroupId).subscribe(success => {
        console.log("removed Project Group", true);
        this.getAllProjectsGroups();
        this.dataGrid.instance.refresh();
      },
        error => {
          console.log("removed Project Group", false);
        }
      );
    });
  }

  onRowUpdating(e) {
	//   debugger;
    this.updateprojectObj = e.oldData;
	this.updateprojectObj.displayName = e.newData.displayName ? e.newData.displayName : e.oldData.displayName;
	this.updateprojectObj.groupNumber = e.newData.groupNumber ? e.newData.groupNumber : e.oldData.groupNumber;
	this.updateprojectObj.startDate = e.newData.startDate ? e.newData.startDate : e.oldData.startDate;
	this.updateprojectObj.endDate = e.newData.endDate ? e.newData.endDate : e.oldData.endDate;
	this.updateprojectObj.notes = e.newData.notes ? e.newData.notes : e.oldData.notes;


    console.log('onRowUpdating', this.updateprojectObj);

    this.service.putProjectGroup(this.updateprojectObj, e.oldData.projectGroupId)
      .subscribe(
        success => {
          console.log("Project Group Updated", true);
          this.getAllProjectsGroups();
          this.dataGrid.instance.refresh();

        },
        error => {
          console.log("Project Group Updated", false);
        }
      );
  }


  onContentReady(e) {
    e.component.option("loadPanel.enabled", true);
  }

}
