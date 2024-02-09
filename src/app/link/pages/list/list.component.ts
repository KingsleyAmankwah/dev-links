import { Component } from '@angular/core';
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

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NavbarComponent,
    LinkFormComponent,
    PhoneEditorComponent,
    CdkDropListGroup,
    CdkDrag,
    CdkDropList,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  formLinks: formLinks[] = [];
  linkCounter = 0;
  // showLinkPreview = false;
  showLinkPreviews: boolean[] = [];

  addLink() {
    const newLink: formLinks = {
      id: `link${this.linkCounter++}`,
      title: '',
      url: '',
    };
    this.formLinks.push(newLink);
    this.showLinkPreviews.push(true);
  }

  removeFormLink(index: number) {
    this.formLinks.splice(index, 1);
    this.showLinkPreviews.splice(index, 1);
  }

  drop(event: CdkDragDrop<formLinks[]>): void {
    moveItemInArray(this.formLinks, event.previousIndex, event.currentIndex);
  }
}
