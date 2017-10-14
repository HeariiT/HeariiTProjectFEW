import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { GlobalDataService } from '../services/global-data.service';
import { SessionService } from '../services/session.service';

@Injectable()
export class NoSessionGuard implements CanActivate {

  constructor(private gbService: GlobalDataService, private sessionService: SessionService,
              private router:Router ) { }

  canActivate( ) {
    if( this.gbService.init( ) ) {
      this.sessionService.validateToken( ).subscribe(
        res => {
          if ( res.json( ).email == null ) {
            this.sessionService.destroySession( );
            this.router.navigate( ['/'] );
          } else
            this.router.navigate( ['/home'] );
        }
      )
      return true;
    } else {
      this.router.navigate( ['/'] );
      return false;
    }
  }

}
