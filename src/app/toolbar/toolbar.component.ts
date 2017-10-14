import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor( private sessionService: SessionService, private router: Router ) { }

  ngOnInit() {
  }

  signOut( ) {
    this.sessionService.signOut( ).subscribe(
      res => {
        this.sessionService.destroySession( )
        this.router.navigate(['/'])
      }
    )
  }

}
