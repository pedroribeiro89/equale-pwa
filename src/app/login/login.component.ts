import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  emailFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  errorMsg = '';

  constructor(fb: FormBuilder, private service: AuthService, private router: Router) {
    this.loginFormGroup = fb.group({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMsg = '';
    this.service.login(this.emailFormControl.value, this.passwordFormControl.value)
      .subscribe(
        () => this.router.navigate(['home']),
        (error: HttpErrorResponse) => this.errorMsg = error.status === 401 ? 'Email ou senha incorretos.' : 'Aconteceu um problema, tente mais tarde.'
      );
  }

}
