import { Injectable } from '@angular/core';
import { userDetails } from '../../auth/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDetailsSubject = new BehaviorSubject<userDetails | null>(null);

  setUserDetails(userDetails: userDetails): void {
    this.userDetailsSubject.next(userDetails);
  }

  getUserDetails(): Observable<userDetails | null> {
    return this.userDetailsSubject.asObservable();
  }
}
