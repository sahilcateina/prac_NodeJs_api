import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { FormBuilder, FormGroup } from '@angular/forms'; //add
// import { HttpClient } from '@angular/common/http';       //add

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
