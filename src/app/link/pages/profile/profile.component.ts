import { Component } from '@angular/core';
import { PhoneEditorComponent } from '../../components/phone-editor/phone-editor.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [PhoneEditorComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  imageUrl = '';

  onSelectedFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
    }
  }
}
