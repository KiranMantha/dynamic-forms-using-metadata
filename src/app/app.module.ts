import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { CommonModule } from '@angular/common';
import { DynamicFormFieldComponent } from './dynamic-form/dynamic-form-field/dynamic-form-field.component';

@NgModule({
  imports: [BrowserModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, DynamicFormComponent, DynamicFormFieldComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
