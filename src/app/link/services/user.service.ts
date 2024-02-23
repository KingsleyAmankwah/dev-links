import { Injectable } from '@angular/core';
import { userDetails } from '../../auth/interfaces';
import { BehaviorSubject } from 'rxjs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  CollectionReference,
  addDoc,
  collection,
  getFirestore,
} from 'firebase/firestore';
import Swal from 'sweetalert2';

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

  private db = getFirestore();

  async saveLinks(links: any[]): Promise<void> {
    const linksCollection: CollectionReference = collection(this.db, 'links');

    for (const link of links) {
      await addDoc(linksCollection, link);
    }

    Swal.fire({
      title: 'Links Saved!',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
    });
  }
}
