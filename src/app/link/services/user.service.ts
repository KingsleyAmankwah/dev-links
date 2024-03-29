import { Injectable, inject } from '@angular/core';
import { userDetails } from '../../auth/interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';
import { formLinks } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userSubject = new BehaviorSubject<userDetails | null>(null);
  user = this.userSubject.asObservable();
  db = getFirestore();

  authService = inject(AuthService);

  constructor() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.reload().then(() => {
          this.userSubject.next({
            id: user.uid,
            name: user.displayName || '',
            email: user.email || '',
            profileImage: user.photoURL || '',
          });
          // Fetch and provide social media links
          this.fetchSocialMediaLinks(user.uid);
        });
      } else {
        this.userSubject.next(null);
      }
    });
  }

  async saveLinks(links: formLinks[]): Promise<void> {
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
      // Fetch the social media links for the user
      await this.fetchSocialMediaLinks(user.uid);

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

  async fetchSocialMediaLinks(userId: string): Promise<void> {
    const linksCollection: CollectionReference = collection(this.db, 'links');

    const userLinksQuery = query(
      linksCollection,
      where('userRef', '==', userId)
    );
    // console.log('Fetching social media links for user: ', userId);
    try {
      const linksSnapshot = await getDocs(userLinksQuery);
      const socialMediaLinks = linksSnapshot.docs.map((doc) => doc.data());

      // Retrieve existing user details
      const existingUserDetails = this.userSubject.getValue() as userDetails;

      if (existingUserDetails) {
        this.userSubject.next({
          ...existingUserDetails,
          id: userId,
          socialMediaLinks: socialMediaLinks,
        });
      } else {
        console.error(
          'Existing user details are null. Unable to update social media links.'
        );
      }
    } catch (error) {
      console.error('Error fetching social media links: ', error);
    }
  }

  fetchUserDetails(userId: string): Observable<userDetails> {
    return new Observable<userDetails>((subscriber) => {
      const userDocRef: DocumentReference = doc(this.db, 'users', userId);

      getDoc(userDocRef)
        .then((userDoc) => {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userDetails: userDetails = {
              id: userId,
              name: userData['displayName'],
              email: userData['email'],
              profileImage: userData['profileImage'],
              socialMediaLinks: [],
            };

            // Fetch the social media links for the user
            const linksCollection: CollectionReference = collection(
              this.db,
              'links'
            );
            const userLinksQuery = query(
              linksCollection,
              where('userRef', '==', userId)
            );

            getDocs(userLinksQuery)
              .then((linksSnapshot) => {
                userDetails.socialMediaLinks = linksSnapshot.docs.map((doc) =>
                  doc.data()
                );

                subscriber.next(userDetails);
                subscriber.complete();
              })
              .catch((error) => {
                subscriber.error(error);
              });
          } else {
            subscriber.error('User not found');
          }
        })
        .catch((error) => {
          subscriber.error(error);
        });
    });
  }
}
