import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [ UserService ]
})
export class SignUpComponent implements OnInit {

  userPostResponse$;

  signUpForm = new FormGroup({
    email: new FormControl(),
    username: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(20),Validators.pattern('[a-zA-Z][a-zA-Z0-9]+')]),
    password: new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(72)]),
  });

  constructor(private uService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit( ) {
        this.userPostResponse$ = this.uService.postUser( this.signUpForm.value );

        this.userPostResponse$.subscribe(
          res => {
              if ( res.status == 200 )
              {
                  this.uService.postUser( this.signUpForm.value );
              }
          },
          err => {
            alert( err );
          },
          () => console.log( "OK: user posted!" )
        );

  }

}
