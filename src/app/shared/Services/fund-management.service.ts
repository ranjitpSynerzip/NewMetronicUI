import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { FundsourceModel } from '../models/fund-source.model';
import { FundSeriesModel } from '../models/fund-series.model';
import { FundAmountModel } from '../models/fund-amount.model';
import { catchError, map } from 'rxjs/operators';
// import { _throw } from 'rxjs/observable/throw';

export class Funds {
	public id: number;
	public name: string;
	public displayName: string;
	public fundAccessLevel: number;
	public createdDate: string;
	public createdByUserId: number;
	public isDeleted: boolean;
	public fundSeries?: FundSeriesModel[];
}

@Injectable({
	providedIn: 'root',
})
export class FundManagementService {
	fundSource: any[] = [];

	constructor(private http: HttpClient) { }

	getfundsource(): Observable<Funds[]> {
		return this.http.get<Funds[]>('/fundsource');
		//.catch(this.errorHandler);
	}

	getfundsourceById(id: number): Observable<any> {
		return this.http.get<any>('/fundsource' + '/' + id)
		//.catch(this.errorHandler);
	}

	putfundsource(fundsourceModle: Funds, id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.put<any>('/fundsource/' + id, fundsourceModle, httpOptions);
	}

	postfundsource(fundsourceModel: FundsourceModel): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<FundsourceModel>('/fundsource', fundsourceModel, httpOptions)
			.pipe(
				map((res: FundsourceModel) => {
					return res;
				}),
				catchError(err => {
					return null;
				})
			);
	}

	deletefundsource(id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.delete<any>('/fundsource' + '/' + id, httpOptions);
	}




	getfundSeries(): Observable<any[]> {
		return this.http.get<any>('/fundSeries')
		//.catchError(this.errorHandler, '');
	}

	getfundSeriesById(id: number): Observable<any> {
		return this.http.get<any>('/fundSeries' + '/' + id)
		//.catch(this.errorHandler);
	}

	putfundSeries(fundSeriesModel: FundSeriesModel, id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.put<any>('/fundSeries' + '/' + id, fundSeriesModel, httpOptions);
	}

	postfundSeries(fundSeriesModel: FundSeriesModel): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<any>('/fundSeries', fundSeriesModel, httpOptions)
		//.catch(this.errorHandler);
	}

	deletefundSeries(id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.delete<any>('/fundSeries' + '/' + id, httpOptions);
	}



	getfundAmount(): Observable<any[]> {
		return this.http.get<any>('/fundAmount')
		//.catch(this.errorHandler);
	}

	getfundAmountById(id: number): Observable<any> {
		return this.http.get<any>('/fundAmount' + '/' + id)
		//.catch(this.errorHandler);
	}

	putfundAmount(fundAmountModel: FundAmountModel, id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.put<any>('/fundAmount' + '/' + id, fundAmountModel, httpOptions);
	}

	postfundAmount(fundAmountModel: FundAmountModel): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<any>('/fundAmount', fundAmountModel, httpOptions)
		//.catch(this.errorHandler);
	}

	deletefundAmount(id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.delete<any>('/fundAmount' + '/' + id, httpOptions);
	}

	// errorHandler(error: Response) {
	// 	return Observable.throw(error);
	// }


	// getEmployees(): Employee[] {
	//     return employees;
	// }
	// getFunds(): Funds[] {
	// 	return funds;
	// }
}






