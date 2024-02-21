import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PhoneEditorComponent } from '../../components/phone-editor/phone-editor.component';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [RouterLink, PhoneEditorComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent {

  
  copyLink() {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('Link copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  }
}
