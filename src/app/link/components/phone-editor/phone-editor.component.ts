import { Component, Input, inject } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { userDetails } from '../../../auth/interfaces';

@Component({
  selector: 'app-phone-editor',
  standalone: true,
  imports: [],
  templateUrl: './phone-editor.component.html',
  styleUrl: './phone-editor.component.css',
})
export class PhoneEditorComponent {
  name: string | null = null;
  email: string | null = null;
  imageUrl: string | null = null;
  private subscription: Subscription | undefined;
  userService = inject(UserService);

  ngOnInit() {
    this.subscription = this.userService.user.subscribe((user) => {
      if (user) {
        this.name = user.name;
        this.email = user.email;
        this.imageUrl = user.profileImage;
      } else {
        this.name = null;
        this.email = null;
        this.imageUrl = null;
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
