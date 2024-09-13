import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LinkFormComponent } from '../../components/link-form/link-form.component';
import { formLinks } from '../../interfaces';
import { PhoneEditorComponent } from '../../components/phone-editor/phone-editor.component';
import {
  CdkDropListGroup,
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    LinkFormComponent,
    PhoneEditorComponent,
    CdkDropListGroup,
    CdkDrag,
    CdkDropList,
    ReactiveFormsModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  formLinks: formLinks[] = [];
  linkCounter = 0;
  showLinkPreviews: boolean[] = [];
  listFormGroup!: FormGroup;
  formErrors: string | null = null;
  userService = inject(UserService);
  constructor(private fb: FormBuilder) {
    this.listFormGroup = this.fb.group({
      links: this.fb.array([]),
    });
  }

  getLinkFormGroup(index: number): FormGroup {
    const linkFormArray = this.listFormGroup.get('links') as FormArray;
    const linkFormGroup = linkFormArray.at(index) as FormGroup;

    return linkFormGroup;
  }

  addLink() {
    const linksArray = this.listFormGroup.get('links') as FormArray;
    linksArray.push(
      this.fb.group(
        {
          platform: ['', Validators.required],
          url: ['', Validators.required],
        },
        { validators: this.validateUrlBasedOnPlatform('platform', 'url') }
      )
    );

    const newLinkIndex = this.formLinks.length;
    const linkFormGroup = this.getLinkFormGroup(newLinkIndex);

    if (linkFormGroup) {
      this.formLinks.push({
        id: newLinkIndex,
        platform: linkFormGroup.get('platform')?.value || '',
        url: linkFormGroup.get('url')?.value || '',
      });
      this.showLinkPreviews.push(true);
    }
    this.showLinkPreviews.push(true);
  }

  removeFormLink(index: number) {
    this.formLinks.splice(index, 1);
    this.showLinkPreviews.splice(index, 1);
  }

  removeAllFormLinks() {
    while (this.formLinks.length > 0) {
      this.formLinks.splice(0, 1);
      this.showLinkPreviews.splice(0, 1);
    }
  }

  drop(event: CdkDragDrop<formLinks[]>): void {
    const updatedFormLinks = [...this.formLinks];
    moveItemInArray(updatedFormLinks, event.previousIndex, event.currentIndex);
    this.formLinks = updatedFormLinks;
  }

  trackByFn(index: number, item: formLinks) {
    return item.id;
  }

  async onSubmit() {
    const links = this.listFormGroup.get('links') as FormArray;
    const linksData = links.value;

    await this.userService.saveLinks(linksData);
    this.removeAllFormLinks();
  }

  validateUrlBasedOnPlatform(
    platformControlName: string,
    urlControlName: string
  ) {
    return (group: FormGroup): ValidationErrors | null => {
      const platform = group.get(platformControlName)?.value;
      const url = group.get(urlControlName)?.value;

      if (platform && url) {
        let pattern: RegExp;

        switch (platform.name) {
          case 'GitHub':
            pattern = /^https:\/\/github\.com\/.+$/;
            break;
          case 'Twitter':
            pattern = /^https:\/\/twitter\.com\/.+$/;
            break;
          case 'LinkedIn':
            pattern = /^https:\/\/www\.linkedin\.com\/.+$/;
            break;
          case 'Frontend Mentor':
            pattern = /^https:\/\/www\.frontendmentor\.io\/.+$/;
            break;
          case 'YouTube':
            pattern = /^https:\/\/www\.youtube\.com\/.+$/;
            break;
          case 'Facebook':
            pattern = /^https:\/\/www\.facebook\.com\/.+$/;
            break;
          case 'Codepen':
            pattern = /^https:\/\/codepen\.io\/.+$/;
            break;
          case 'Twitch':
            pattern = /^https:\/\/www\.twitch\.tv\/.+$/;
            break;
          case 'Devto':
            pattern = /^https:\/\/dev\.to\/.+$/;
            break;
          case 'Codewars':
            pattern = /^https:\/\/www\.codewars\.com\/.+$/;
            break;
          case 'Hashnode':
            pattern = /^https:\/\/hashnode\.com\/.+$/;
            break;
          case 'FreeCodeCamp':
            pattern = /^https:\/\/www\.freecodecamp\.org\/.+$/;
            break;
          case 'GitLab':
            pattern = /^https:\/\/gitlab\.com\/.+$/;
            break;
          case 'Stack Overflow':
            pattern = /^https:\/\/stackoverflow\.com\/.+$/;
            break;

          default:
            pattern = /^https?:\/\/.+$/;
        }

        if (!pattern.test(url)) {
          return { invalidUrl: true };
        }
      }

      return null;
    };
  }
}
