import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { Success } from "../../toster/success/success";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Success],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  login = new FormGroup({
    email: new FormControl("",[Validators.email,Validators.required]),
    password: new FormControl("",[Validators.minLength(8),Validators.maxLength(20),Validators.required]),
  })

  submit() {
    console.log(this.login.value)
  }
}
