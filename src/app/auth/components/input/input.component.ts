import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() inputIcon = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = '';
  @Input() control: FormControl | null = null;
  @Input() errorMessage: Record<string, string> = {};
  @Input() required: boolean = false;

  ngOnInit() {
    if (!this.control) {
      this.control = new FormControl();
    }
  }

  get hasError(): boolean {
    return this.control
      ? this.control.invalid && (this.control.touched || this.control.dirty)
      : false;
  }

  get errorType() {
    if (!this.control || !this.control.errors) return;
    return Object.keys(this.control.errors)[0];
  }
}
