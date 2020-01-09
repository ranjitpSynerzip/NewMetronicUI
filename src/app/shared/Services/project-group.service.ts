import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ProjectgroupModel } from '../models/projectgroup-model';

@Injectable({
  providedIn: 'root'
})

export class ProjectGroupService {

	baseUrl = environment.baseUrl;
	dapperUrl = environment.dapperUrl;
	projectGroupObj: ProjectgroupModel[];
	constructor(private http: HttpClient) { }

	getProjectGroup(): Observable<ProjectgroupModel[]> {
		return this.http.get<ProjectgroupModel[]>(this.baseUrl + '/ProjectGroup');
	}

	deleteProjectGroup(id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.delete<any>(this.dapperUrl + '/ProjectGroup' + '/' + id, httpOptions);
	}

	getProjectGroupbyID(id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.get<any>(this.baseUrl + '/ProjectGroup' + '/' + id, httpOptions);
	}

	putProjectGroup(projectgroupModel: ProjectgroupModel, id: number): Observable<any> {
		debugger;
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.put<any>(this.dapperUrl + '/ProjectGroup' + '/' + id, projectgroupModel, httpOptions);
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

	postProjectGroup(projectgroupModel: ProjectgroupModel): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<ProjectgroupModel>(this.dapperUrl + '/ProjectGroup', projectgroupModel, httpOptions)
			.pipe(
				map((res: ProjectgroupModel) => {
					return res;
				}),
				catchError(err => {
					return null;
				})
			);
	}

}
