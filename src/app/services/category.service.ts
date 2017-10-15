import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GlobalDataService } from './global-data.service';

@Injectable()
export class CategoryService {

  backPath;
  headers:any;

  constructor( private http: Http, private gbService: GlobalDataService ) {
    this.backPath = gbService.backPath
    gbService.headersObs$.subscribe(
      res => {
        this.headers = res
      }
    )
  }

  getDefaultCategories( ) {
    return this.http.get( this.backPath + '/categories', null )
             .map( ( res: Response ) => res );
  }

  getUserCategories( ) {
    var accessToken = localStorage.getItem( 'accessToken' )
    var hds = {
      'Content-Type' : 'application/json; charset=utf-8',
      'x-access-token' : accessToken
    }
    const headers = new Headers( hds );
    const options = new RequestOptions( { headers: headers } );
    return this.http.get( this.backPath + '/user_categories', options )
             .map( ( res: Response ) => res );
  }

  getFilesForCategory( cat_id ) {
    var accessToken = localStorage.getItem( 'accessToken' )
    var hds = {
      'Content-Type' : 'application/json; charset=utf-8',
      'x-access-token' : accessToken
    }
    const headers = new Headers( hds );
    const options = new RequestOptions( { headers: headers } );
    return this.http.get( this.backPath + '/files_for_category/' + cat_id, options )
             .map( ( res: Response ) => res );
  }

  postCategory( catName ) {
    var accessToken = localStorage.getItem( 'accessToken' )
    var body = {
      category_name : catName
    }
    var hds = {
      'Content-Type' : 'application/json; charset=utf-8',
      'x-access-token' : accessToken
    }
    const headers = new Headers( hds );
    const options = new RequestOptions( { headers: headers } );

    return this.http.post( this.backPath + '/user_categories', JSON.stringify( body ), options )
             .map( ( res: Response ) => res );
  }

}
