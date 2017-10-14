import { NgModule } from '@angular/core';

import {
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSliderModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSliderModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule
  ]
})
export class MaterialModule {}
