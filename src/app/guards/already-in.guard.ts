import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { GlobalDataService } from '../services/global-data.service';
import { SessionService } from '../services/session.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AlreadyInGuard implements CanActivate {

  constructor(private gbService: GlobalDataService, private sessionService: SessionService,
              private uService: UserService, private router:Router ) { }

  canActivate( ) {
    if( !this.gbService.init( ) ) {
      return true;
    } else {
      this.sessionService.validateToken( ).subscribe(
        res => {
          if ( res.json( ).email == null ) {
            this.sessionService.destroySession( );
            this.router.navigate( ['/'] );
          } else {
            this.uService.getEmail( res.json( ) ).subscribe(
              ans => {
                localStorage.setItem( 'userData', JSON.stringify( ans ) )
              }
            )
            this.router.navigate( ['/home'] );
          }
        }
      )
      return false;
    }
  }

}
