import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GlobalDataService } from './global-data.service';
import { ResponseContentType } from '@angular/http';

@Injectable()
export class SongManagementService {

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

  getAllSongs( ) {
    const headers = new Headers( this.headers );
    const options = new RequestOptions( { headers: headers } );

    return this.http.get( this.backPath + '/songs', options )
             .map( ( res: Response ) => res );
  }

  downloadSong( id ) {
    const headers = new Headers( this.headers );
    var op = {
        responseType: ResponseContentType.Blob,
        headers: new Headers( this.headers )
    }

    return this.http.get( this.backPath + '/download/' + id , op )
             .map( ( res: Response ) => res );
  }

}
