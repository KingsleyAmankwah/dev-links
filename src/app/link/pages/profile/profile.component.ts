import { Component, inject } from '@angular/core';
import { PhoneEditorComponent } from '../../components/phone-editor/phone-editor.component';
import { userDetails } from '../../../auth/interfaces';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { getAuth, updateProfile } from 'firebase/auth';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from '@firebase/storage';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [PhoneEditorComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userData!: userDetails;
  imageUrl = '';

  fb = inject(FormBuilder);
  userService = inject(UserService);

  profileForm = this.fb.group({
    name: [''],
    email: [{ value: '', disabled: true }, Validators.required],
  });

  ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      this.profileForm.patchValue({
        name: user.displayName,
        email: user.email,
      });
      this.imageUrl = user.photoURL || '';
    }
  }

  onSelectedFile(e: any) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log(file);
      const storage = getStorage();
      const storageRef = ref(storage, 'profileImages/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle the upload progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error('Upload failed:', error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            this.imageUrl = downloadURL;
          });
        }
      );
    }
  }

  onSave() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const { name } = this.profileForm.value;

      updateProfile(user, { displayName: name, photoURL: this.imageUrl }).then(
        () => {
          user.reload().then(() => {
            this.userService.userSubject.next({
              name: user.displayName || '',
              email: user.email || '',
              profileImage: user.photoURL || '',
            });
          });
        }
      );
    }
  }
}
