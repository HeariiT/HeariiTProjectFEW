import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UploadComponent } from '../upload/upload.component';
import { SessionService } from '../services/session.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor( private sessionService: SessionService, private router: Router,
                public dialog: MatDialog ) { }

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

  openUpLoad() {
      let dialogRef = this.dialog.open( UploadComponent, {
          height: '500px',
          width: '700px'
      });


  }

}
