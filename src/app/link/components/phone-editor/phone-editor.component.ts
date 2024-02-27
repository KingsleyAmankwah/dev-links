import { Component, Input, inject } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { userDetails } from '../../../auth/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phone-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './phone-editor.component.html',
  styleUrl: './phone-editor.component.css',
})
export class PhoneEditorComponent {
  @Input() userId!: string;
  name: string | null = null;
  email: string | null = null;
  imageUrl: string | null = null;
  socialMediaLinks: any[] = [];
  private subscription: Subscription | undefined;
  userService = inject(UserService);

  ngOnInit() {
    if (this.userId) {
      this.subscription = this.userService
        .fetchUserDetails(this.userId)
        .subscribe((user) => {
          if (user) {
            this.name = user.name;
            this.email = user.email;
            this.imageUrl = user.profileImage;
            this.socialMediaLinks = user.socialMediaLinks || [];
          } else {
            this.name = null;
            this.email = null;
            this.imageUrl = null;
            this.socialMediaLinks = [];
          }
        });
    } else {
      this.subscription = this.userService.user.subscribe((user) => {
        if (user) {
          this.name = user.name;
          this.email = user.email;
          this.imageUrl = user.profileImage;
          this.socialMediaLinks = user.socialMediaLinks || [];
        } else {
          this.name = null;
          this.email = null;
          this.imageUrl = null;
          this.socialMediaLinks = [];
        }
      });
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
