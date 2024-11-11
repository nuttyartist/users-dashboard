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
        z-index: 1000;
      }

      .dialog {
        background-color: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
      }

      h2 {
        color: #2c3e50;
        text-align: center;
        margin-bottom: 20px;
      }

      form {
        display: grid;
        grid-gap: 15px;
      }

      label {
        display: block;
        margin-bottom: 5px;
        color: #2c3e50;
        font-weight: 500;
      }

      input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1em;
      }

      .button-group {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
      }

      button {
        padding: 8px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1em;
        transition: background-color 0.3s;
      }

      button[type='button'] {
        background-color: #95a5a6;
        color: white;
      }

      button[type='submit'] {
        background-color: #2ecc71;
        color: white;
      }

      button:hover {
        opacity: 0.9;
      }

      button:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
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
