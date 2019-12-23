import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  userObj: any;

  ngOnInit() {
    this.userObj = JSON.parse(localStorage.getItem('user'));
  }

}
