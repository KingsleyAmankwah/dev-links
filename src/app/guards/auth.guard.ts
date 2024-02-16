import { CanActivateFn } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = getAuth();
  return new Observable<boolean>((observer) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        observer.next(!!user); // emit true if the user is logged in, false otherwise
        observer.complete();
      },
      (error) => {
        observer.error(error);
      }
    );
    return unsubscribe; // return the unsubscribe function to clean up the subscription
  });
};
