import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PhoneEditorComponent } from '../../components/phone-editor/phone-editor.component';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [RouterLink, PhoneEditorComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent {}
