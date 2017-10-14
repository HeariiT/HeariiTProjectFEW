import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SessionService } from '../services/session.service';
import { GlobalDataService } from '../services/global-data.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { style, state, animate, transition, trigger } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [
      trigger('slideIn', [
        state('*', style({})),
        state('void', style({})),
        transition('* => void', [
            style({ height: '*' }),
            animate(150, style({ height: 0}))
        ]),
        transition('void => *', [
            style({ height: '0' }),
            animate(150, style({ height: '*' }))
        ])
    ]),
    trigger('fadeInOut', [
        transition(':enter', [
          style({opacity:0}),
          animate(200, style({opacity:1}))
        ]),
        transition(':leave', [
          animate(200, style({opacity:0}))
        ])
    ])
  ]
})
export class SignUpComponent implements OnInit {

  re:boolean = false;
  pa:boolean = false;
  em:boolean = false;
  us:boolean = false;
  userExists:boolean = false;
  emailExists:boolean = false;

  rePassword:string;
  userPostResponse$;
  getUserResponse$;
  getEmailResponse$;

  emailRegex:string = "[a-zA-Z][a-zA-Z0-9]+[@][a-zA-Z.]+";

  signUpForm = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.pattern(this.emailRegex)]),
    username: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(20),Validators.pattern('[a-zA-Z][a-zA-Z0-9]+')]),
    password: new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(72)]),
  });

  constructor( private uService: UserService, private router: Router, private sessionService: SessionService,
                private gbService: GlobalDataService ) { }

  ngOnInit() {
  }

  onSubmit( ) {
    this.userPostResponse$ = this.uService.postUser( this.signUpForm.value );

    this.userPostResponse$.subscribe(
      res => {
          if ( res.status == 200 ) {
              this.sessionService.signIn( this.signUpForm.value ).subscribe(
                ans => {
                  this.gbService.updateAccessToken( ans.headers.get( 'x-access-token' ) )
                  this.router.navigate( [ 'home' ] )
                }
              )
          }
      },
      err => {
        console.log( err );
      },
      () => console.log( "OK: user posted!" )
    );

  }

  subscribeUsernameData() {
    this.getUserResponse$ = this.uService.getUser(this.signUpForm.value);

    this.getUserResponse$.subscribe(
      res => {
        if (res.status == 200){
          this.userExists = true;
        }
      },
    );

  }

  subscribeEmailData() {
    this.getEmailResponse$ = this.uService.getEmail(this.signUpForm.value);

    this.getEmailResponse$.subscribe(
      res => {
        if (res.status == 200)
          this.emailExists = true;
      },
    );
  }

  emailInputChanged(){
    this.em = true;
  }

  userInputChanged(){
    this.us = true;
  }

  passwordInputChanged(){
    this.pa = true;
  }

  rePasswordInputChanged(){
    this.re = true;
  }

  checkForEmailEmptyResponse( ) {
      return this.em;
  }

  checkForUserEmptyResponse( ) {
      return this.us;
  }

  checkForPasswordEmptyResponse( ) {
      return this.pa;
  }

  verifyUser() {
    return this.userExists;
  }

  verifyEmail() {
    return this.emailExists;
  }

  checkRePassword(){
    if ( this.signUpForm.value['password'] == this.rePassword )
      return false;
    return true;
  }

  checkExistingUsername() {
    this.userExists = false;
    window.setTimeout(() =>{
      this.subscribeUsernameData()
    },5000);
  }

  checkExistingEmail() {
    this.emailExists = false
    window.setTimeout(() =>{
      this.subscribeEmailData()
    },5000);
  }

}
