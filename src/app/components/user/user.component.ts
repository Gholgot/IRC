import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  service:UserService;
  information:string [];
  logged:boolean;

  constructor() {
    this.service = new UserService();
   }

  ngOnInit() { 
    
  }

}


