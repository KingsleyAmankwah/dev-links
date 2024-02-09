import { Component } from '@angular/core';
import { PhoneEditorComponent } from '../../components/phone-editor/phone-editor.component';
import { userDetails } from '../../../auth/interfaces';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [PhoneEditorComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userData!: userDetails;
  imageUrl = '';

  constructor(private fb: FormBuilder) {}

  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: ['', [Validators.email]],
    profileImage: [''],
  });

  onSelectedFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
    }
  }

  onSave() {}

  // onSave() {
  //   if (this.profileForm.valid) {
  //     const userData: userDetails = {
  //       firstName: this.profileForm.value.firstName!,
  //       lastName: this.profileForm.value.lastName!,
  //       email: this.profileForm.value.email!,
  //       profileImage: this.imageUrl,
  //     };
  //     // this.userData = this.profileForm.value;
  //     localStorage.setItem('userDetails', JSON.stringify(userData));
  //     console.log('User details:', userData);
  //     this.saveDetails();
  //   } else {
  //     console.log('Form is not valid');
  //   }
  // }
}
