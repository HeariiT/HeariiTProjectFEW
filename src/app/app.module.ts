import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ActivatedRoute, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { MaterialModule } from './material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

export const appRoutes: Routes = [
  
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    NoopAnimationsModule,
    RouterModule.forRoot( appRoutes )
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
