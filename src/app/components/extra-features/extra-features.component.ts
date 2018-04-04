import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-extra-features',
  templateUrl: './extra-features.component.html',
  styleUrls: ['./extra-features.component.css']
})

export class ExtraFeaturesComponent implements OnInit {

  modal:ModalComponent;

  constructor(feature:string) {
    this.modal = new ModalComponent();
    return this[feature];
   }

  ngOnInit() {
  }
  
}

