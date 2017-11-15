import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GlobalDataService } from './global-data.service';

@Injectable()
export class UserService {

  headers: any;
  userData: any;

  backPath;


  constructor(private http: Http, private gbService: GlobalDataService) {
    this.backPath = gbService.backPath
   }


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
