import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import ModalStore from "./contents/modal_store";

declare var $:any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() {
   }

  ngOnInit() {
    
  }

  // This function is going to load the choosen modal and if it doesn't exist
  // it won't display anything
  public load(modal_name: string): any {
    var desired_modal:any = new ModalStore().modals[modal_name].content;
    console.log("Loading Modal");
    this.write_modal(desired_modal);
  }

  //____________ Functions _________    
  // This function is going to load the content into the modal and make is apear
  private write_modal(content:string) {
    $("#modal_content").html(content);
    $("#modal_window").slideDown("600");
    this.modal_remove();
  }

  // This function is going to make notification popup
  private show_response(bool:boolean, message:any) {
    $('.alert-box').html('');
    if (bool === true) {
      $('.alert-box').append("<div class='alert alert-valid is-rounded'><p>" + message + "</p><i class='fas fa-times remove_element'></i></div>");
    } else {
      if (typeof (message) == "object") {
        message.forEach(function (error) {
          $(".alert-box").append("<div class='alert alert-error is-rounded'><p>" + error + "</p><i class='fas fa-times remove_element'></i></div>");
        });
      } else {
        $(".alert-box").append("<div class='alert alert-error is-rounded'><p>" + message + "</p><i class='fas fa-times remove_element'></i></div>");
      }
    }

    $('.remove_element').click(function () {
      $(this).parent().toggle("slide");
      setTimeout(function () {
        $(this).parent().remove();
      }, 400);
    })
  }

  // This function is going to create the event on modal-cross
  private modal_remove() {
    $(".modal_cross").click(function () {
      $('#modal_window').slideUp("300");
      setTimeout(function () {
        $('#modal_content').html('');
      }, 600);
    });
    $('.send_form').click(function () {
      var input_values = {};
      $(".form").serializeArray().forEach(function (input) {
        input_values[input.name] = input.value;
      });
      this.send_form(input_values, $('.form').attr('name'));
    })
  }

}
