import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class UserService {
  word:string = "Test";
  constructor() { }

  // This method will send token to the server then get a response to see if the token is valid
  public verifyToken(token: string) {
    
  }

  // This method will send front-end informmation to the API
  public loggin(inputs:string []) {

  }

  // This method will send information that the token isn't valid anymore
  public loggout(): any {
    
  }

}
