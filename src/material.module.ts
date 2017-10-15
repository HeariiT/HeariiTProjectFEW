import { NgModule } from '@angular/core';

import {
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSliderModule,
  MatDialogModule,
  MatAutocompleteModule
} from '@angular/material';

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSliderModule,
    MatAutocompleteModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatAutocompleteModule
  ]
})
export class MaterialModule {}
