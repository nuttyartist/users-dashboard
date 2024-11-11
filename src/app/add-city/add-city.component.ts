import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-city',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<div class="dialog-overlay">
    <div class="dialog">
      <h2>Add New City</h2>
      <form [formGroup]="cityForm" (submit)="onSubmit()">
        <label for="cityName">City Name:</label>
        <input id="cityName" type="text" formControlName="name" />

        <div class="button-group">
          <button type="button" (click)="onCancel()">Cancel</button>
          <button type="submit" [disabled]="!cityForm.valid">Submit</button>
        </div>
      </form>
    </div>
  </div>`,
  styles: [
    `
      .dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .dialog {
        background-color: white;
        padding: 20px;
      }
    `,
  ],
})
export class AddCityComponent {
  @Output() closeDialog = new EventEmitter<void>();
  @Output() cityAdded = new EventEmitter<string>();

  cityForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  onCancel() {
    this.closeDialog.emit();
  }

  onSubmit() {
    if (this.cityForm.valid) {
      this.cityAdded.emit(this.cityForm.value.name!);
    }
  }
}
