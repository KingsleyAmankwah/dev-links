import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { formLinks } from '../../interfaces';
import { CdkDropListGroup, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { PLATFORMS } from '../../platforms';

@Component({
  selector: 'app-link-form',
  standalone: true,
  imports: [CdkDropListGroup, CdkDrag, CdkDropList],
  templateUrl: './link-form.component.html',
  styleUrl: './link-form.component.css',
})
export class LinkFormComponent {
  @Input() link!: formLinks;
  @Input() index!: number;

  platforms = PLATFORMS;
  showPlatforms = false;
  selectedPlatform!: { id: Number; name: string; ImageURL: string };

  @Output() removeFormLink = new EventEmitter<number>();

  onRemoveFormLinkClicked() {
    this.removeFormLink.emit(this.index);
  }

  onSelectFormClicked() {
    this.showPlatforms = !this.showPlatforms;
  }

  onPlatformClicked(platform: { id: number; name: string; ImageURL: string }) {
    console.log('platform', platform);
    this.selectedPlatform = platform;
    this.showPlatforms = false;
  }
}
