import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs/Rx';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.css']
})
export class NewMatchComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<NewMatchComponent>, private catService: CategoryService ) { }

  res;
  file_id;
  myControl: FormControl = new FormControl();
  options = [];
  categories_data =[]
  filteredOptions: Observable<string[]>;

  ngOnInit( ) {
    this.catService.getDefaultCategories( ).subscribe(
      res => {
        this.categories_data = res.json( )
        this.catService.getUserCategories( ).subscribe(
          ans => {
            this.categories_data = this.categories_data.concat( ans.json( ) )
            for ( var i = 0; i < this.categories_data.length; i++ )
              this.options.push( this.categories_data[ i ].category_name )
            this.filteredOptions = this.myControl.valueChanges
               .startWith( null )
               .map( val => val ? this.filter( val ) : this.options.slice( ) );
          }
        )
      }
    )
  }

  filter( val: string ): string[] {
    return this.options.filter(
      option => option.toLowerCase( ).indexOf( val.toLowerCase( ) ) === 0
    );
  }

  closeDialog( ) {
    this.dialogRef.close( )
  }

  createMatch( catName ) {
    if ( catName != "" ) {
      var catId = this.categoryIdFrom( catName )
      if ( this.res.error != undefined ) {
        this.catService.createMatch( this.file_id, catId ).subscribe(
          () => {
            this.dialogRef.close( )
          }
        )
      } else {
        this.catService.updateMatch( this.file_id, catId ).subscribe(
          () => {
            this.dialogRef.close( )
          }
        )
      }
    }
  }

  categoryIdFrom( catName ) {
    for ( var i = 0; i < this.categories_data.length; i++ )
      if ( this.categories_data[ i ].category_name == catName )
        return this.categories_data[ i ].category_id
    return 'NotFound'
  }

}
