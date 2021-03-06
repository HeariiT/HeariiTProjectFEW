import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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

import { GlobalDataService } from './services/global-data.service';
import { SessionService } from './services/session.service';
import { UserService } from './services/user.service';
import { SongManagementService } from './services/song-management.service';
import { CategoryService } from './services/category.service';

import { AlreadyInGuard } from './guards/already-in.guard';
import { NoSessionGuard } from './guards/no-session.guard';
import { NewCategoryComponent } from './new-category/new-category.component';
import { NewMatchComponent } from './new-match/new-match.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [ AlreadyInGuard ],
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
    canActivate: [ NoSessionGuard ],
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
    UploadComponent,
    NewCategoryComponent,
    NewMatchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    NoopAnimationsModule,
    RouterModule.forRoot( appRoutes )
  ],
  entryComponents: [
    UploadComponent,
    NewCategoryComponent,
    NewMatchComponent
  ],
  providers: [
    GlobalDataService,
    AlreadyInGuard,
    NoSessionGuard,
    SessionService,
    UserService,
    SongManagementService,
    CategoryService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
