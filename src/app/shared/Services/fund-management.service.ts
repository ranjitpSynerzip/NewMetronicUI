import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FundsourceModel } from '../models/fund-source.model';
import { FundSeriesModel } from '../models/fund-series.model';
import { FundAmountModel } from '../models/fund-amount.model';
import { catchError, map } from 'rxjs/operators';


export class Funds {
	public fundId: number;
	public fundName: string;
	public districtId: number;
	public fundAamount: number;
	public fundCamount: number;
	public fundCode: number;
	public createdBy: number;
	public createdDate: Date;
	public modifiedBy: number;
	public modifiedDate: Date;
	public isDeleted: boolean;
	public series?: FundSeriesModel[];
}

@Injectable({
	providedIn: 'root',
})
export class FundManagementService {
	fundSource: any[] = [];
	baseUrl = 'http://172.25.29.38:88/api';

	constructor(private http: HttpClient) { }

	getfundsource(): Observable<Funds[]> {
		return this.http.get<Funds[]>(this.baseUrl + '/Funds');
	}

	getfundsourceById(id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/Funds/' + id)
	}

	putfundsource(fundsourceModle: Funds, id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.put<any>(this.baseUrl + '/Funds/' + id, fundsourceModle, httpOptions);
	}

	postfundsource(fundsourceModel: Funds): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<Funds>(this.baseUrl + '/Funds', fundsourceModel, httpOptions)
			.pipe(
				map((res: Funds) => {
					return res;
				}),
				catchError(err => {
					return null;
				})
			);
	}

	deletefundsource(id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.delete<any>(this.baseUrl + '/Funds' + '/' + id, httpOptions);
	}




	getfundSeries(): Observable<any[]> {
		return this.http.get<any>(this.baseUrl + '/Series')
		//.catchError(this.errorHandler, '');
	}

	getfundSeriesById(id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/Series/' + id)
		//.catch(this.errorHandler);
	}

	putfundSeries(fundSeriesModel: FundSeriesModel, id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.put<any>(this.baseUrl + '/Series/' + id, fundSeriesModel, httpOptions);
	}

	postfundSeries(fundSeriesModel: FundSeriesModel): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<any>(this.baseUrl + '/Series', fundSeriesModel, httpOptions)
		//.catch(this.errorHandler);
	}

	deletefundSeries(id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.delete<any>(this.baseUrl + '/Series/' + id, httpOptions);
	}



	getfundAmount(): Observable<any[]> {
		return this.http.get<any>(this.baseUrl + '/SeriesDetails')
		//.catch(this.errorHandler);
	}

	getfundAmountById(id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/SeriesDetails/' + id)
		//.catch(this.errorHandler);
	}

	putfundAmount(fundAmountModel: FundAmountModel, id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.put<any>(this.baseUrl + '/SeriesDetails/' + id, fundAmountModel, httpOptions);
	}

	postfundAmount(fundAmountModel: FundAmountModel): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<any>(this.baseUrl + '/SeriesDetails', fundAmountModel, httpOptions)
		//.catch(this.errorHandler);
	}

	deletefundAmount(id: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.delete<any>(this.baseUrl + '/SeriesDetails/' + id, httpOptions);
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






