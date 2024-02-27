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

  isLoggedIn = this.authService.getCurrentUser() !== null;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
    });
  }

  async copyLink() {
    const userId = this.userId || (await this.authService.getUserId());
    if (userId) {
      const profileLink = `/link/preview/${userId}`;
      const url = window.location.origin + profileLink;

      // Check if the clipboard API is available
      if (!navigator.clipboard) {
        alert(
          'Your browser does not support the clipboard API. Please copy the link manually: ' +
            url
        );
        return;
      }
      // Copy the link to the clipboard
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert('Link copied to clipboard');
        })
        .catch((err) => {
          alert('Failed to copy link. Please try again.');
          console.error('Failed to copy: ', err);
        });
    } else {
      alert('You must be logged in to share your page.');
    }
  }
}
