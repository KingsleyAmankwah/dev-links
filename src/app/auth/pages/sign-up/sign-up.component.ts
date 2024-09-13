import { Component, inject } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  isLoading = false;
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  registerForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]*$/),
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_]).{8,}$/
        ),
      ],
    ],
  });

  formControlName(name: string) {
    return this.registerForm.get(name) as FormControl;
  }

  onSubmit() {
    this.isLoading = true;
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      this.authService.signUp(
        email as string,
        password as string,
        name as string
      );

      this.isLoading = false;
    }
  }

  inputs = [
    {
      type: 'text',
      label: 'Username',
      control: 'name',
      placeholder: 'Enter your username',
      errorMessage: {
        required: 'Username is required',
        pattern: 'username should be in alphabets',
        minlength: 'username must be at least 2 characters',
        maxlength: 'username must be at most 50 characters',
      } as Record<string, string>,
      icon: '/assets/images/icon-changes-saved.svg',
    },

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
        pattern:
          'Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number',
      } as Record<string, string>,
      icon: '/assets/images/icon-password.svg',
    },
  ];
}
