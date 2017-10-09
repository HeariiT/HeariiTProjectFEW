import { NgModule } from '@angular/core';

import {
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class MaterialModule {}
