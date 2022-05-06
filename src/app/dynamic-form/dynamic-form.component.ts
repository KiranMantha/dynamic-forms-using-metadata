import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Control, ControlType, ControlValidations } from '../controls.model';

const composeConditionalValidator = (
  predicate: Function,
  controlName: string,
  error: Record<string, boolean>
) => {
  return (formGroup: FormGroup) => {
    const resolvedValue = predicate(formGroup.value);
    if (resolvedValue) {
      formGroup.get(controlName).setValidators(Validators.required);
    } else {
      formGroup.get(controlName).clearValidators();
    }
    formGroup.get(controlName).updateValueAndValidity({ onlySelf: true });

    return resolvedValue ? error : null;
  };
};

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnChanges {
  @Input() controls: Control[];
  form: FormGroup;
  isFormSubmitted: boolean;

  private formGroupValidators: Array<any> = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
    this.isFormSubmitted = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.controls.firstChange) {
      this.createForm(this.controls);
    }
  }

  submitForm() {
    console.log(this.form);
    this.isFormSubmitted = true;
  }

  private createForm(controls: Control[]) {
    for (let control of controls) {
      if (control.options?.length && control.type === ControlType.CHECKBOX) {
        const formArray = control.options.map(
          (option) =>
            new FormGroup({ [option.name]: new FormControl(option.value) })
        );
        this.form.addControl(
          control.name,
          new FormArray(
            formArray,
            this.composeValidators(control.name, control.validations)
          )
        );
      } else {
        this.form.addControl(
          control.name,
          new FormControl(
            control.value,
            this.composeValidators(control.name, control.validations)
          )
        );
      }
    }
    this.form.setValidators(this.formGroupValidators);
  }

  private composeValidators(
    controlName: string,
    validations: ControlValidations = {}
  ): ValidatorFn[] {
    const validators = [];
    for (const [key, value] of Object.entries(validations)) {
      switch (key) {
        case 'required': {
          if (typeof value === 'boolean') {
            validators.push(Validators.required);
          } else {
            const predicate = new Function(
              'model',
              `return ${value.expression}`
            );

            this.formGroupValidators.push(
              composeConditionalValidator(predicate, controlName, {
                required: true,
              })
            );
          }
          break;
        }
        case 'minLength': {
          validators.push(Validators.minLength(value));
          break;
        }
        case 'maxLength': {
          validators.push(Validators.maxLength(value));
          break;
        }
        case 'pattern': {
          validators.push(Validators.pattern(value));
          break;
        }
      }
    }
    return validators;
  }
}
