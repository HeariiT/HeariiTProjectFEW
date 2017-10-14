import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GlobalDataService } from './global-data.service';

@Injectable()
export class SessionService {

  backPath;
  headers;

  constructor( private http: Http, private gbService: GlobalDataService ) {
    this.backPath = gbService.backPath
    gbService.headersObs$.subscribe(
      res => {
        this.headers = res
      }
    )
  }

  signIn ( formData ) {
    var user = {
        "email": formData.email,
        "password": formData.password
    }

    const headers = new Headers( this.headers );
    const options = new RequestOptions( { headers: headers } );

    return this.http.post( this.backPath + '/sign_in', JSON.stringify( user ), options )
          .map( ( res: Response ) => res );
  }

  signOut( ) {
    const headers = new Headers( this.headers );
    const options = new RequestOptions( { headers: headers } );

    return this.http.post( this.backPath + '/sign_out', JSON.stringify({}), options )
          .map( ( res: Response ) => res );
  }

  destroySession( ) {
    this.gbService.destroySession( )
  }

}
