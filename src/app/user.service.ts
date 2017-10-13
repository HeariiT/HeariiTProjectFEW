import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {

  headers: any;
  userData: any;

  backPath: string = 'http://192.168.99.101:4000';


  constructor(private http: Http) { }


  postUser( formData ) {

      var user = {
          "email": formData.email,
          "username": formData.username,
          "password": formData.password,
          "first_name": "Undefined",
          "last_name": "Undefined"
      }

    const headers = new Headers( { 'Content-Type': 'application/json; charset=utf-8' } );
    const options = new RequestOptions( { headers: headers } );

    return this.http.post( this.backPath + '/sign_up', JSON.stringify( user ), options )
          .map( ( res: Response ) => res );
  }

  signIn (formData){
    var user = {
        "email": formData.email,
        "password": formData.password
    }

    const headers = new Headers( { 'Content-Type': 'application/json; charset=utf-8' } );
    const options = new RequestOptions( { headers: headers } );

    return this.http.post( this.backPath + '/sign_in', JSON.stringify( user ), options )
          .map( ( res: Response ) => res );

  }

  getUser( formData ) {

      var user = {
          "username": formData.username,
      }

    const headers = new Headers( { 'Content-Type': 'application/json; charset=utf-8' } );
    const options = new RequestOptions( { headers: headers } );

    return this.http.post( this.backPath + '/username', JSON.stringify( user ), options )
          .map( ( res: Response ) => res );
  }

  getEmail( formData ) {

      var email = {
          "email": formData.email,
      }

    const headers = new Headers( { 'Content-Type': 'application/json; charset=utf-8' } );
    const options = new RequestOptions( { headers: headers } );

    return this.http.post( this.backPath + '/email', JSON.stringify( email ), options )
          .map( ( res: Response ) => res );
  }


}
