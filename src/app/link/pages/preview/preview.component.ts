import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PhoneEditorComponent } from '../../components/phone-editor/phone-editor.component';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [RouterLink, PhoneEditorComponent, CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent {
  userId!: string;
  authService = inject(AuthService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
    });
  }

  copyLink() {
    const userId = this.userId || this.authService.getUserId();
    if (userId) {
      const profileLink = `/link/preview/${userId}`;
      const url = window.location.origin + profileLink;

      // Copy the link to the clipboard
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert('Link copied to clipboard');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    } else {
      console.error('User is not authenticated. Unable to copy link.');
    }
  }
}

