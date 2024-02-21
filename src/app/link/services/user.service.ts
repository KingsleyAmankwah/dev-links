import { Injectable } from '@angular/core';
import { userDetails } from '../../auth/interfaces';
import { BehaviorSubject } from 'rxjs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userSubject = new BehaviorSubject<userDetails | null>(null);
  user = this.userSubject.asObservable();
  constructor() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.reload().then(() => {
          this.userSubject.next({
            name: user.displayName || '',
            email: user.email || '',
            profileImage: user.photoURL || '',
          });
        });
      } else {
        this.userSubject.next(null);
      }
    });
  }
}
