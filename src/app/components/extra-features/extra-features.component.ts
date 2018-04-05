import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-extra-features',
  templateUrl: './extra-features.component.html',
  styleUrls: ['./extra-features.component.css']
})

export class ExtraFeaturesComponent implements OnInit {

  public modal:ModalComponent;

  constructor(feature:string) {
    if (feature == "modal") {
      this.modal = new ModalComponent();
    }
   }

  ngOnInit() {
  }

  public Capitalize(lower_string:string):string {
    return lower_string.charAt(0).toUpperCase() + lower_string.slice(1);
  }
  
}

