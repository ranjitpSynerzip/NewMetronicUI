import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FundemitterService {

  invokeComponentFunction = new EventEmitter();
  subsVar: Subscription; 
  constructor() { }

  onSaveOnUpdate() {
    this.invokeComponentFunction.emit();
  }
}
