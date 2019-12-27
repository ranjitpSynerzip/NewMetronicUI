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

	deleteProject(id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.delete<any>(this.baseUrl + '/Projects' + '/' + id, httpOptions);
	}

	putProject(projectModel: ProjectModel, id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.put<any>(this.baseUrl + '/Projects' + '/' + id, projectModel, httpOptions);
	}

}


