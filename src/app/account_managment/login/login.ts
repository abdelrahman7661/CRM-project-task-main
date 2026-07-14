import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Services } from '../../services/services';
import { Error } from '../../toster/error/error';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Error],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  http = inject(HttpClient);
  service = inject(Services);
  router = inject(Router);
  error_state = signal(false);

  login = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.required,
    ]),
  });

  submit() {
    const api = 'https://dummyjson.com/auth/login';
    const user = {
      username: this.login.value.username,
      password: this.login.value.password,
      expiresInMins: 30,
    };

    this.http.post(api, user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.service.current_user.set(res);
        window.localStorage.setItem('Token', JSON.stringify(res.accessToken));
        // this.service.get_user_data_by_auth(res.accessToken);
        this.router.navigateByUrl('/deals');
      },
      error: (err) => {
        if (err) {
          console.log(err);
          this.error_state.set(true);
          setTimeout(() => {
            this.error_state.set(false);
          }, 5000);
        }
      },
    });
  }
}
