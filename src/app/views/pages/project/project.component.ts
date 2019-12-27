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



  constructor(private httpClient: HttpClient, private service: ProjectService) {

    this.httpClient.get(this.baseUrl + '/Projects')
     .toPromise().then(res => this.dataSource = res as ProjectModel[]);
    // this.service.getProjects().subscribe(
    //   data => {
    //       this.dataSource = data;
    //   });

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

  OnProjectInserting(){

  }

  onProjectUpdating(){

  }

}
