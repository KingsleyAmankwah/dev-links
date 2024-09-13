import { Component, inject } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [InputComponent, RouterLink, ReactiveFormsModule, ButtonComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  isLoading = false;
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['', [Validators.required]],
  });

  formControlName(name: string) {
    return this.loginForm.get(name) as FormControl;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      this.authService.login(email as string, password as string);
      this.isLoading = false;
    }
  }

  inputs = [
    {
      type: 'email',
      label: 'Email',
      control: 'email',
      placeholder: 'Enter your email address',
      errorMessage: {
        required: 'Email is required',
        email: 'Invalid email address',
        pattern: 'Invalid email address',
      } as Record<string, string>,
      icon: '/assets/images/icon-email.svg',
    },

    {
      type: 'password',
      label: 'Password',
      control: 'password',
      placeholder: 'Enter your password',
      errorMessage: {
        required: 'Password is required',
      } as Record<string, string>,
      icon: '/assets/images/icon-password.svg',
    },
  ];
}
