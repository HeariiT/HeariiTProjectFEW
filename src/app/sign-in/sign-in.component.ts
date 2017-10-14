import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SessionService } from '../services/session.service';
import { GlobalDataService } from '../services/global-data.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [ UserService ]
})
export class SignInComponent implements OnInit {

  pa:boolean = false;
  em:boolean = false;
  falseCredentials: boolean = false;



  emailRegex:string = "[a-zA-Z][a-zA-Z0-9]+[@][a-zA-Z.]+";
  userSignInResponse$;

  signInForm = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.pattern(this.emailRegex)]),
    password: new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(72)])
  });


  constructor( private uService: UserService, private router: Router, private sessionService: SessionService,
                 private gbService: GlobalDataService ) { }

  ngOnInit() {
  }

  onSubmit( ) {
    this.userSignInResponse$ = this.sessionService.signIn( this.signInForm.value );

    this.userSignInResponse$.subscribe(
      res => {
        if ( res.status == 200 ) {
          this.gbService.updateAccessToken( res.headers.get( 'x-access-token' ) )
          this.router.navigate( [ 'home' ] )
        }
      },
      err => {
        this.falseCredentials = true;
        console.log(err);
      },
      () => console.log( "User logged in successfully" )
    );

  }

  checkForEmailEmptyResponse( ) {
      return this.em;
  }

  checkForPasswordEmptyResponse( ) {
      return this.pa;
  }

  emailInputChanged(){
    this.em = true;
  }

  passwordInputChanged(){
    this.pa = true;
  }

}
