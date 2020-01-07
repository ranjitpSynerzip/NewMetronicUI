import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campusmodel, Campusgridmodel } from './../models/campusmodel';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export class BudgetSummary {
	Title: string;
	TotalBudget: number;
	TotalContracts: number;
	TotalTransaction: number;
	PassthroughExpense: number;
	UnencumbredProjectBalance: number;
	LeadgerAccountAdjustments: number;
	campusId: number;
	ProjectId: number;
	items?: BudgetSummary[];
}


var budgetsummary: BudgetSummary[] = [{
	"Title": "Client",
	"TotalBudget": 1000000,
	"TotalContracts": 100,
	"TotalTransaction": 150,
	"PassthroughExpense": 10,
	"UnencumbredProjectBalance": 20,
	"LeadgerAccountAdjustments": 50,
	"campusId": 0,
	"ProjectId": 0,
	"items": [{
		"Title": "Campus 1",
		"campusId": 5,
		"ProjectId": 0,
		"TotalBudget": 2000000,
		"TotalContracts": 200,
		"TotalTransaction": 200,
		"PassthroughExpense": 20,
		"UnencumbredProjectBalance": 40,
		"LeadgerAccountAdjustments": 100,
		"items": [{
			"campusId": 5,
			"ProjectId": 0,
			"Title": "Project Group 1",
			"TotalBudget": 2000000,
			"TotalContracts": 200,
			"TotalTransaction": 200,
			"PassthroughExpense": 20,
			"UnencumbredProjectBalance": 40,
			"LeadgerAccountAdjustments": 100,
			"items": [{
				"campusId": 5,
				"ProjectId": 1,
				"Title": "Project 1",
				"TotalBudget": 2000000,
				"TotalContracts": 200,
				"TotalTransaction": 200,
				"PassthroughExpense": 20,
				"UnencumbredProjectBalance": 40,
				"LeadgerAccountAdjustments": 100,
			}, {
				"campusId": 5,
				"ProjectId": 2,
				"Title": "Project 2",
				"TotalBudget": 2000000,
				"TotalContracts": 200,
				"TotalTransaction": 200,
				"PassthroughExpense": 20,
				"UnencumbredProjectBalance": 40,
				"LeadgerAccountAdjustments": 100,
			}, {
				"campusId": 5,
				"ProjectId": 3,
				"Title": "Project 3",
				"TotalBudget": 2000000,
				"TotalContracts": 200,
				"TotalTransaction": 200,
				"PassthroughExpense": 20,
				"UnencumbredProjectBalance": 40,
				"LeadgerAccountAdjustments": 100,
			}]
		}]
	}]
}];

@Injectable({
	providedIn: 'root',
})

export class CampusManagementService {

	baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) { }

	// getCampuses() {
	// 	return campuses;
	// }

	getCampuswithdetails(): Observable<Campusgridmodel[]> {
		return this.http.get<Campusgridmodel[]>(this.baseUrl + '/Campus/getcampswithdetails')
	}

	getCampus(): Observable<Campusmodel[]> {
		return this.http.get<Campusmodel[]>(this.baseUrl + '/Campus')
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

	getcampsforgrid(): Observable<any[]> {
		return this.http.get<any[]>(this.baseUrl + '/Campus/getcampsforgrid');
	}

	getBudgetSummary(): BudgetSummary[] {
        return budgetsummary;
    }

}
