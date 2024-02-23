import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { formLinks } from '../../interfaces';
import { CdkDropListGroup, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { PLATFORMS } from '../../platforms';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-link-form',
  standalone: true,
  imports: [
    CdkDropListGroup,
    CdkDrag,
    CdkDropList,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './link-form.component.html',
  styleUrl: './link-form.component.css',
})
export class LinkFormComponent {
  @Input() link!: formLinks;
  @Input() index!: number;
  @Input() linkFormGroup!: FormGroup;

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
    this.selectedPlatform = platform;
    this.linkFormGroup.get('platform')?.setValue(platform);
    console.log(this.linkFormGroup.get('platform')?.value);
  }
}
