import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formLinks } from '../../interfaces';
import { CdkDropListGroup, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

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

  @Output() removeFormLink = new EventEmitter<number>();
  formSelected = false;

  onRemoveFormLinkClicked() {
    this.removeFormLink.emit(this.index);
  }

  onSelectFormClicked() {
    this.formSelected = !this.formSelected;
    // console.log('Form selected');
  }
}
