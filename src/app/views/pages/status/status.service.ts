import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  getData(): Observable<Status> {
    let apiURL = environment.baseUrl + "/status";
    return this.http.get<Status>(apiURL);
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