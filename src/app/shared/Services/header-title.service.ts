import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderTitleService {
  temp: any;
  private Headertitle = new BehaviorSubject<any>(null);
  data = this.Headertitle.asObservable();


  constructor() { }

  updatetitle(title: any){
    this.Headertitle.next(title);
  }

}
