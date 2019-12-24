import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Campusmodel } from './../models/campusmodel';
import { catchError, map } from 'rxjs/operators';

export class Campus {
	ID: number;
	Name: string;
	Code: number;
}

// let campuses: Campus[] = [
// 	{
// 		ID: 1,
// 		Name: "Anahim",
// 		Code: 6655455,
// 	},
// 	{
// 		ID: 2,
// 		Name: "New Port",
// 		Code: 454486,
// 	},
// 	{
// 		ID: 3,
// 		Name: "Diamond Bar",
// 		Code: 785152,
// 	},
// 	{
// 		ID: 4,
// 		Name: "Placentia",
// 		Code: 56565656,
// 	},
// 	{
// 		ID: 5,
// 		Name: "Brea County",
// 		Code: 7458123,
// 	},
// 	{
// 		ID: 6,
// 		Name: "Brea County",
// 		Code: 7458123,
// 	},
// 	{
// 		ID: 7,
// 		Name: "Brea County",
// 		Code: 7458123,
// 	},
// 	{
// 		ID: 8,
// 		Name: "Brea County",
// 		Code: 7458123,
// 	},
// ]

@Injectable({
	providedIn: 'root',
})

export class CampusManagementService {

	baseUrl = 'http://172.25.29.38:88/api'

	constructor(private http: HttpClient) { }

	// getCampuses() {
	// 	return campuses;
	// }

	getCampus(): Observable<any[]> {
		return this.http.get<any>(this.baseUrl + '/Campus')
	}

	getCampusById(id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/Campus' + '/' + id)
	}

	putCampus(campusModel: Campusmodel, id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.put<any>(this.baseUrl + '/Campus' + '/' + id, campusModel, httpOptions);
	}

	postCampus(campusModel: Campusmodel): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<Campusmodel>(this.baseUrl + '/Campus', campusModel, httpOptions)
			.pipe(
				map((res: Campusmodel) => {
					return res;
				}),
				catchError(err => {
					return null;
				})
			);
	}

	deleteCampus(id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.delete<any>(this.baseUrl + '/Campus' + '/' + id, httpOptions);
	}


}
