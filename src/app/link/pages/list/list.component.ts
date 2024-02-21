import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
} from '@angular/forms';

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
  linkForm!: FormGroup;

  fb = inject(FormBuilder);

  ngOnInit() {
    this.linkForm = this.fb.group({
      links: this.fb.array([]),
    });
  }

  get links(): FormArray {
    return this.linkForm.get('links') as FormArray;
  }

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
    console.log('Dropped', event);
    const updatedFormLinks = [...this.formLinks];
    moveItemInArray(updatedFormLinks, event.previousIndex, event.currentIndex);
    this.formLinks = updatedFormLinks;
  }

  trackByFn(index: number, item: formLinks) {
    return item.id;
  }

  // linkForm = this.fb.group({});

  onSubmit() {
    console.log(this.linkForm.value);
  }
}
