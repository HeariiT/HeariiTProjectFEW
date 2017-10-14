import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ActivatedRoute, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { MaterialModule } from '../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';

import 'hammerjs';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MusicContainerComponent } from './music-container/music-container.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      { path: '',
        component: SignInComponent,
      },
      { path: 'sign_up',
        component: SignUpComponent,
      },
    ]
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LandingComponent,
    SignInComponent,
    SignUpComponent,
    MusicContainerComponent,
    HomeComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    NoopAnimationsModule,
    RouterModule.forRoot( appRoutes )
  ],
  entryComponents: [
    UploadComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
