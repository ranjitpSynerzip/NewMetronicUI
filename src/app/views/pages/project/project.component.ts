import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../../../shared/Services/project.service';
import { ProjectModel } from '../../../shared/models/project-model.module';
import { confirm } from 'devextreme/ui/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kt-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  dataSource: any [];
  baseUrl = 'http://172.25.29.38:88/api';
  selectedItemKeys: any[] = [];
  SelectedRowsData: any[] = [];
  private deleteProjects: Subscription;
  updateprojectObj = new ProjectModel();
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

  constructor(private httpClient: HttpClient, private service: ProjectService) {

    this.httpClient.get(this.baseUrl + '/Projects')
     .toPromise().then(res => this.dataSource = res as ProjectModel[]);
    // this.service.getProjects().subscribe(
    //   data => {
    //       this.dataSource = data;
	//   });

	this.service.getStatus().subscribe(data => {
		this.Statues = data;
		console.log("statues", this.Statues);
	  });

	  this.service.getContacts().subscribe(data => {
		this.contacts = data;
		console.log(this.contacts);
	  });

	  this.service.getCompanies().subscribe(data => {
		this.companies = data;
		console.log(this.companies);
	  });

   }

  ngOnInit() {
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
      this.deleteProjects = this.service.deleteProject(item.projectId).subscribe(success => {
        console.log("removed Project", true);
        // this.getData();
        //this.dataGrid.instance.refresh();
      },
        error => {
          console.log("removed Project", false);
        }
      );
    });
    // this.dataGrid.instance.refresh();

  }

  onRowUpdating(e) {
    this.updateprojectObj = e.oldData;
	this.updateprojectObj.displayName = e.newData.displayName ? e.newData.displayName : e.oldData.displayName;
	this.updateprojectObj.startDate = e.newData.startDate ? e.newData.startDate : e.oldData.startDate;
	this.updateprojectObj.estimatedCompletionDate = e.newData.estimatedCompletionDate ? e.newData.estimatedCompletionDate : e.oldData.estimatedCompletionDate;
	this.updateprojectObj.statusId = e.newData.statusId ? e.newData.statusId : e.oldData.statusId;
	this.updateprojectObj.gccontactId = e.newData.gccontactId ? e.newData.gccontactId : e.oldData.gccontactId;
	this.updateprojectObj.aorcontactId = e.newData.aorcontactId ? e.newData.aorcontactId : e.oldData.aorcontactId;
	this.updateprojectObj.aorcompanyId = e.newData.aorcompanyId ? e.newData.aorcompanyId : e.oldData.aorcompanyId;
	this.updateprojectObj.gccompanyId = e.newData.gccompanyId ? e.newData.gccompanyId : e.oldData.gccompanyId;
	this.updateprojectObj.orgCodeId = e.newData.orgCodeId ? e.newData.orgCodeId : e.oldData.orgCodeId;




    this.service
      .putProject(this.updateprojectObj, e.oldData.projectId)
      .subscribe(
        success => {
          console.log("Project Updated", true);
        //   this.getData();
        },
        error => {
          console.log("Project Updated", false);
        }
      );
  }

//   OnProjectInserting(){

//   }

//   onProjectUpdating(){

//   }

}
