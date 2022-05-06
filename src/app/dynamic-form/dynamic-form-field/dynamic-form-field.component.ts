import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Control, ControlType } from '../../controls.model';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.css'],
})
export class DynamicFormFieldComponent {
  @Input() control: Control;
  @Input() form: FormGroup;
  @Input() isFormSubmitted: boolean;

  controlType = ControlType;

  get controlErrors(): any {
    return this.form.get(this.control.name).errors;
  }

  getFormArray(controlname: string): FormGroup[] {
    return this.form.get(controlname)['controls'] as FormGroup[];
  }
}
