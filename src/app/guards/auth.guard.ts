import { CanActivateFn } from '@angular/router';
import { getAuth } from 'firebase/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = getAuth();
  return !!auth.currentUser; // return true if the user is logged in, else false
};
