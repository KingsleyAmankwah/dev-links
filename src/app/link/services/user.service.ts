import { Injectable, inject } from '@angular/core';
import { userDetails } from '../../auth/interfaces';
import { BehaviorSubject } from 'rxjs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  getFirestore,
} from 'firebase/firestore';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userSubject = new BehaviorSubject<userDetails | null>(null);
  user = this.userSubject.asObservable();

  authService = inject(AuthService);

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
    const user = this.authService.getCurrentUser();

    if (user) {
      const linksCollection: CollectionReference = collection(this.db, 'links');

      for (const link of links) {
        // Associate each link with the authenticated user
        const linkData = {
          ...link,
          userRef: user.uid,
        };

        try {
          // Use addDoc to add a document to the 'links' collection
          const docRef: DocumentReference<DocumentData> = await addDoc(
            linksCollection,
            linkData
          );
          console.log('Document written with ID: ', docRef.id);
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      }

      Swal.fire({
        title: 'Links Saved!',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      console.error('User is not authenticated. Unable to save links.');
    }
  }
}
