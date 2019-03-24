import { ApiError } from '../model/api-error';
import { FormGroup } from '@angular/forms';

export default class Utils {
  static setErrorsInFormGroup(form: FormGroup, errors: ApiError[]) {
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
