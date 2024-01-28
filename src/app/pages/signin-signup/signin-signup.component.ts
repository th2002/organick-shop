import { Component, OnInit } from '@angular/core';
import { BannerPageComponent } from '@components/banner-page/banner-page.component';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BannerPageComponent,
    BreadcrumbComponent,
    PasswordModule,
    InputTextModule,
    ToastModule
  ],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.scss'
})
export class SigninSignupComponent implements OnInit {
  title: string = 'Login - Signup';
  background_url: string = 'assets/images/banners/background_shop.png';
  pattern_url: string = 'assets/images/banners/pattern_shop.png';
  slug = [{ label: 'Login', routerLink: '/login' }];

  form_sign_up: boolean = false;
  form_login: boolean = true;

  signupFormGroup!: FormGroup;
  loginFormGroup!: FormGroup;

  constructor(
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.signupFormGroup = new FormGroup({
      signup_email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email
      ]),
      signup_password: new FormControl<string | null>(null, [
        Validators.required
      ]),
      signup_confirm_password: new FormControl<string | null>(null, [
        Validators.required
      ])
    });

    this.loginFormGroup = new FormGroup({
      login_email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email
      ]),
      login_password: new FormControl<string | null>(null, [
        Validators.required
      ])
    });
  }

  showFormSignUp() {
    this.form_sign_up = true;
    this.form_login = false;
  }

  showFormLogin() {
    this.form_login = true;
    this.form_sign_up = false;
  }

  submitSignUpForm(signupForm: FormGroup) {
    if (
      signupForm.value.signup_password !==
      signupForm.value.signup_confirm_password
    ) {
      this.show('Confirm password is not correct', 'error', 'Error');
      return;
    }

    this.auth
      .signUp(signupForm.value.signup_email, signupForm.value.signup_password)
      .subscribe(() => {
        this.show('Signup successfully', 'success', 'Success');
        this.showFormLogin();
      });
  }

  submitLoginForm(loginForm: FormGroup) {
    this.auth.login(
      loginForm.value.login_email,
      loginForm.value.login_password
    );
  }

  show(mes: string, severity: string, summary: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: mes
    });
  }
}
