import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  userData: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.userData = history.state.data;
  }
}
