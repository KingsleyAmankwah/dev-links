import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

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
      console.log('User signed up:', userCredential.user);

      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
        console.log('User profile updated:', userCredential.user);
      }
    } catch (error) {
      console.error('Error signing up:', error);
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
      this.router.navigate(['/link']);
      console.log('User logged in:', userCredential.user);
    } catch (error: any) {
      // console.error('Error logging in:', error);
      throw this.getErrorMessage(error.code);
      // alert(this.getErrorMessage(error.code));
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
      // add more cases for other codes
      default:
        return 'An unknown error occurred.';
    }
  }
}
