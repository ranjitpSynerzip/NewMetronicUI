import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { FundallocationModel } from '../models/fund-amount.model';
import { environment } from '../../../environments/environment';


export class CampusSummary {
    campusId: number;
    campusName: string;
    seriesName: string;
    Amount: number;
    seriesId: number;
    displayOrder: string;
}

let campusSummary: CampusSummary[] = [
    {
        "campusId": 1,
        "campusName": "Australia",
        "seriesName": "seriesName1",
        "Amount": 3920,
        "seriesId": 1,
        "displayOrder": "1"
    }, {
        "campusId": 2,
        "campusName": "Australia",
        "seriesName": "seriesName1",
        "Amount": 6040,
        "seriesId": 2,
        "displayOrder": "1"
    }, {
        "campusId": 3,
        "campusName": "Australia",
        "seriesName": "seriesName2",
        "Amount": 2205,
        "seriesId": 3,
        "displayOrder": "2"
    }, {
        "campusId": 4,
        "campusName": "Australia",
        "seriesName": "seriesName2",
        "Amount": 990,
        "seriesId": 4,
        "displayOrder": "2"
    }, {
        "campusId": 5,
        "campusName": "Australia1",
        "seriesName": "seriesName2",
        "Amount": 700,
        "seriesId": 5,
        "displayOrder": "2"
    }, {
        "campusId": 6,
        "campusName": "Australia1",
        "seriesName": "seriesName1",
        "Amount": 2325,
        "seriesId": 6,
        "displayOrder": "1"
    }, {
        "campusId": 7,
        "campusName": "Australia1",
        "seriesName": "seriesName1",
        "Amount": 1980,
        "seriesId": 7,
        "displayOrder": "1"
    }, {
        "campusId": 8,
        "campusName": "Australia1",
        "seriesName": "seriesName1",
        "Amount": 1110,
        "seriesId": 8,
        "displayOrder": "1"
    }, {
        "campusId": 9,
        "campusName": "Australia1",
        "seriesName": "seriesName2",
        "Amount": 3090,
        "seriesId": 9,
        "displayOrder": "2"
    }, {
        "campusId": 10,
        "campusName": "Australia1",
        "seriesName": "seriesName2",
        "Amount": 1640,
        "seriesId": 10,
        "displayOrder": "2"
    }, {
        "campusId": 11,
        "campusName": "Australia2",
        "seriesName": "seriesName2",
        "Amount": 3190,
        "seriesId": 11,
        "displayOrder": "2"
    }, {
        "campusId": 12,
        "campusName": "Australia2",
        "seriesName": "seriesName2",
        "Amount": 3250,
        "seriesId": 12,
        "displayOrder": "2"
    }, {
        "campusId": 13,
        "campusName": "Australia2",
        "seriesName": "seriesName1",
        "Amount": 5550,
        "seriesId": 13,
        "displayOrder": "1"
    }, {
        "campusId": 14,
        "campusName": "Australia2",
        "seriesName": "seriesName1",
        "Amount": 2860,
        "seriesId": 14,
        "displayOrder": "1"
    },
    {
        "campusId": 15,
        "campusName": "Australia2",
        "seriesName": "seriesName1",
        "Amount": 990,
        "seriesId": 15,
        "displayOrder": "1"
    }];


@Injectable({
    providedIn: 'root'
})

export class FundAllocationService {
    fundAllocationObj: FundallocationModel[];
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) { }

    getcampusSummary() {
        return campusSummary;
    };

    getfundAllocation(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl + '/SeriesDetails/fundallocation');
    }

    getfunds() {
        // this.getfundAllocation().subscribe(data => {
        //     return  this.fundAllocationObj = data;
        //     console.log('getfundAllocation', this.fundAllocationObj);
        // });

        return this.http.get(this.baseUrl + '/SeriesDetails/fundallocation')
            .toPromise().then(res => this.fundAllocationObj = res as FundallocationModel[]);

    }


    public async fetchData() {
        const data = await this.http.get(this.baseUrl + '/SeriesDetails/fundallocation').toPromise();
        console.log("Data: " + JSON.stringify(data));
        return JSON.stringify(data);
    }

    updateseriesdetailamount(amount: string, seriseName: string, fundName: string, campusName: string): Observable<any> {
        // let params = new HttpParams();
        // params = params.append('amount' , amount );
        // params = params.append('seriesName' , seriseName );
        // params = params.append('fundName' , fundName );
        // params = params.append('campusName' , campusName );
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

        return this.http.put<any>(this.baseUrl + '/SeriesDetails/updateseriesdetailamount?amount=' + amount + '&seriesName=' + seriseName + '&fundName=' + fundName + '&campusName=' + campusName, httpOptions)
    }


}
