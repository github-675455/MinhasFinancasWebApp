import { ApiError } from '../model/api-error';
import { FormGroup } from '@angular/forms';

export default class Utils {
  static setErrorsInFormGroup(form: FormGroup, errors: any) {
    if (errors instanceof Array) {
      const typeofApiError = typeof ApiError;
      if (typeof errors[0] === typeofApiError) {
        errors.forEach(error => {
          const formControl = form.get(error.field);
          if (formControl) {
            formControl.setErrors(
              {
                serverError: error.description
              }
            );
          }
        });
      }
    }
  }
}
