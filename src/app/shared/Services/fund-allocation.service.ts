import { Injectable } from '@angular/core';



export class Sale {
  id: number;
  campus: string;
  serise: string;
  amount: number;
  fund: string;
}

let sales: Sale[] = [   {
    "id": 16,
    "campus": "Australia",
    "serise": "serise1",
    "amount": 3920,
    "fund": "Measure1"
},  {
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
},  {
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
  constructor() { }

getSales() {
  return sales;
};

}
