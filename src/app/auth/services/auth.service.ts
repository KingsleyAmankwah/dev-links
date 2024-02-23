import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);

  async signUp(email: string, password: string, name: string): Promise<void> {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
        Swal.fire({
          title: 'Account Created!',
          text: 'Your account has been created successfully!',
          icon: 'success',
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
        });
        this.router.navigate(['/link']);
      }
    } catch (error: any) {
      Swal.fire({
        title: 'Error!',
        text: this.getErrorMessage(error.code),
        icon: 'error',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  }

  async login(email: string, password: string): Promise<void> {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        Swal.fire({
          title: 'Welcome!',
          text: 'You have been logged in successfully!',
          icon: 'success',
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
        });
        this.router.navigate(['/link']);
      }
    } catch (error: any) {
      Swal.fire({
        title: 'Error!',
        text: this.getErrorMessage(error.code),
        icon: 'error',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  }

  getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/user-disabled':
        return 'The user account has been disabled by an administrator.';
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
        return 'The password is not correct.';
      case 'auth/invalid-credential':
        return 'Invalid login Credentials.';
      case 'auth/email-already-in-use':
        return 'The email address is already in use by another account.';
      default:
        return 'An unknown error occurred.';
    }
  }
}
