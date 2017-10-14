import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openUpLoad() {
      let dialogRef = this.dialog.open( UploadComponent, {
          height: '500px',
          width: '700px'
      });


  }

}
