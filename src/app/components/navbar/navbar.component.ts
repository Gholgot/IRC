import { Component, OnInit } from '@angular/core';
import { ExtraFeaturesComponent } from  '../extra-features/extra-features.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  extra_features:any;

  constructor() {
    this.extra_features = new ExtraFeaturesComponent('modal');
  }

  ngOnInit() {
  }


}
