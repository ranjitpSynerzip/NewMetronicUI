import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { FundallocationModel } from '../models/fund-amount.model';


export class Sale {
    id: number;
    campus: string;
    serise: string;
    amount: number;
    fund: string;
}

let sales: Sale[] = [{
    "id": 16,
    "campus": "Australia",
    "serise": "serise1",
    "amount": 3920,
    "fund": "Measure1"
}, {
    "id": 41,
    "campus": "Australia",
    "serise": "serise1",
    "amount": 6040,
    "fund": "Bond-Local"
}, {
    "id": 42,
    "campus": "Australia",
    "serise": "serise2",
    "amount": 2205,
    "fund": "Bond-Local"
}, {
    "id": 43,
    "campus": "Australia",
    "serise": "serise1",
    "amount": 990,
    "fund": "Alumini-Fund"
}, {
    "id": 44,
    "campus": "Australia",
    "serise": "serise2",
    "amount": 700,
    "fund": "Alumini-Fund"
}, {
    "id": 45,
    "campus": "Australia",
    "serise": "serise2",
    "amount": 2325,
    "fund": "Alumini-Fund"
}, {
    "id": 64,
    "campus": "Australia",
    "serise": "serise2",
    "amount": 1980,
    "fund": "Alumini-Fund"
}, {
    "id": 65,
    "campus": "Australia",
    "serise": "serise1",
    "amount": 1110,
    "fund": "Alumini-Fund"
}, {
    "id": 90,
    "campus": "Australia",
    "serise": "serise1",
    "amount": 3090,
    "fund": "Fund-Source4"
}, {
    "id": 91,
    "campus": "Australia",
    "serise": "serise1",
    "amount": 1640,
    "fund": "Fund-Source4"
}, {
    "id": 114,
    "campus": "Australia",
    "serise": "serise2",
    "amount": 3190,
    "fund": "Fund-Source4"
}, {
    "id": 278,
    "campus": "Australia",
    "serise": "serise2",
    "amount": 3250,
    "fund": "Fund-Source4"
}, {
    "id": 279,
    "campus": "Australia",
    "serise": "serise1",
    "amount": 5550,
    "fund": "Measure1"
}, {
    "id": 280,
    "campus": "Australia",
    "serise": "serise2",
    "amount": 2860,
    "fund": "Measure1"
},
{
    "id": 580,
    "campus": "Australia",
    "serise": "serise1",
    "amount": 990,
    "fund": "Measure1"
}];


@Injectable({
    providedIn: 'root'
})

export class FundAllocationService {
    fundAllocationObj: FundallocationModel[];
    baseUrl = 'http://172.25.29.38:88/api';
    constructor(private http: HttpClient) { }

    getSales() {
        return sales;
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
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<any>(this.baseUrl + '/SeriesDetails/updateseriesdetailamount?amount=' + amount +'&seriesName='+ seriseName +'&fundName='+ fundName +'&campusName='+ campusName, httpOptions)
    }


}
