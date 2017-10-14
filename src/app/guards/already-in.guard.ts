import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { GlobalDataService } from '../services/global-data.service';

@Injectable()
export class AlreadyInGuard implements CanActivate {

  constructor(private gbService: GlobalDataService,
              private router:Router ) { }

  canActivate( ) {
    if( !this.gbService.init( ) ) {
      return true;
    } else {
      this.router.navigate( ['/home'] );
      return false;
    }
  }

}
