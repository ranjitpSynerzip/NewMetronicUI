import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../../../shared/Services/project.service';
import { ProjectModel } from '../../../shared/models/project-model.module';

@Component({
  selector: 'kt-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  dataSource: any [];
  baseUrl = 'http://172.25.29.38:88/api';
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


  OnProjectInserting(){

  }

  onProjectUpdating(){
    
  }

}
