import { Component } from '@angular/core';
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

  constructor(private fb: FormBuilder) {}

  profileForm = this.fb.group({
    name: [''],
    email: ['', [Validators.email]],
    // profileImage: [''],
  });

  ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      this.profileForm.patchValue({
        name: user.displayName,
        email: user.email,
        // profileImage: user.photoURL,
      });
      this.imageUrl = user.photoURL || '';
    }
  }
  // onSelectedFile(e: any) {
  //   if (e.target.files) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(e.target.files[0]);
  //     reader.onload = (event: any) => {
  //       this.imageUrl = event.target.result;
  //     };
  //   }
  // }

  onSelectedFile(e: any) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, 'profileImages/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle the upload progress
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
            // this.profileForm.patchValue({ profileImage: downloadURL });
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
      updateProfile(user, { displayName: name, photoURL: this.imageUrl });
      console.log('User details updated:', user);
    }
  }
}
