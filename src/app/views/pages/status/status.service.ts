import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
// import { ProjectModel } from './../models/project-model.module';
import { ProjectModel } from '../../../shared/models/project-model.module';

import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getData(): Observable<Status> {
    let apiURL = environment.baseUrl + "/status";
    return this.http.get<Status>(apiURL);
  }


  getStatus(): Observable<any[]> {
		return this.http.get<any>(this.baseUrl + '/Status')
  }
  
  getCompanies(): Observable<any[]> {
		return this.http.get<any>(this.baseUrl + '/Companies')
  }

  getContacts(): Observable<any[]> {
		return this.http.get<any>(this.baseUrl + '/Contacts')
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

  // getVersion(): Observable<any> {
  //   // let apiURL = environment.versionfile;
  //   let apiURL = '/assets/VERSION';
  //   return this.http.get<any>(apiURL);
  // }



  errorHandler(error: Response) {
    return Observable.throw(error);
  }



}


export class Status {
  public database_client_details_string: string;
  public database_main_string: string;
  public up: string;
  public database_client_details: string;
  public database_main: string;
  public version: string;
  public assembly_version: string;
}
