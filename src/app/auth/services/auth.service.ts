import { Injectable } from '@angular/core';
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
  constructor() {}

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
      console.log('User logged in:', userCredential.user);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
}
