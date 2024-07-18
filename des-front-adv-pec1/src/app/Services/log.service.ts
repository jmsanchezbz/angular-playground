import { FormGroup } from '@angular/forms';

export function logFormErrors(form: FormGroup) {
    for (const controlName in form.controls) {
        if (form.controls.hasOwnProperty(controlName)) {
          const control = form.controls[controlName];
    
          if (control.errors) {
            for (const errorKey in control.errors) {
              if (control.errors.hasOwnProperty(errorKey)) {
                console.log(`Validation error for control ${controlName}: ${errorKey}`);
              }
            }
          }
        }
      }
}