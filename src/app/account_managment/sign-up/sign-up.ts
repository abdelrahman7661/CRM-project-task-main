import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  sign_up = new FormGroup({
    first_name: new FormControl("",Validators.required),
    last_name: new FormControl("",Validators.required),
    email: new FormControl("",[Validators.email,Validators.required]),
    password: new FormControl("",[Validators.minLength(8),Validators.maxLength(20),Validators.required]),
    confirm_password: new FormControl("",[Validators.minLength(8),Validators.maxLength(20),Validators.required])
  })

  submit() {
    console.log(this.sign_up.value)
  }
}
