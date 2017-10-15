import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<NewCategoryComponent>, private catService: CategoryService ) { }

  ngOnInit() {
  }

  errorOnPost = false

  postCategory( catName ) {
    if ( catName != "" ) {
      this.catService.postCategory( catName ).subscribe(
        res => {
        },
        (res) => {
          console.log( res )
          this.errorOnPost = true
        },
        () => {
          this.errorOnPost = false
          this.closeDialog( )
        }
      )
    }
  }

  closeDialog( ) {
    this.dialogRef.close( );
  }

}
