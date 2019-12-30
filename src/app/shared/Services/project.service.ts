import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ProjectModel } from '../models/project-model.module';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class ProjectService {

	baseUrl = environment.baseUrl;
	projectObj: ProjectModel[];
	constructor(private http: HttpClient) { }


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

	getStatus(): Observable<any[]> {
		return this.http.get<any>(this.baseUrl + '/Status')
	}

	getContacts(): Observable<any[]> {
		return this.http.get<any>(this.baseUrl + '/Contacts')
	}

	getCompanies(): Observable<any[]> {
		return this.http.get<any>(this.baseUrl + '/Companies')
	}

	getActivities(): Observable<any[]> {
		return this.http.get<any>(this.baseUrl + '/Activities')
	}

	postProject(projectModel: ProjectModel): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<ProjectModel>(this.baseUrl + '/Projects', projectModel, httpOptions)
			.pipe(
				map((res: ProjectModel) => {
					return res;
				}),
				catchError(err => {
					return null;
				})
			);
	}

}


