import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ProjectModel } from '../models/project-model.module';



@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = 'http://172.25.29.38:88/api';
  projectObj : ProjectModel[];
  constructor(private http: HttpClient) { }


  // getProjects() {

  //   return this.http.get(this.baseUrl + '/Projects')
  //     .toPromise().then(res => this.projectObj = res as ProjectModel[]);

  // }

  getProjects(): Observable<ProjectModel[]> {
		return this.http.get<ProjectModel[]>(this.baseUrl + '/Projects');
	}

}


