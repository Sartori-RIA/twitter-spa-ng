import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UsersService} from '../core/api/users.service';

export namespace CookieCodeValidators {

  export function uniqueEmail(service: UsersService, oldEmail?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (control.value == null) {
        return null;
      }
      return service.checkEmail(control.value).pipe(
        map((response) =>
          response.status === 409 && oldEmail !== control.value ? {emailInUse: true} : null)
      );
    };
  }

  export function uniqueUsername(service: UsersService, oldEmail?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (control.value == null) {
        return null;
      }
      return service.checkUsername(control.value).pipe(
        map((response) =>
          response.status === 409 && oldEmail !== control.value ? {emailInUse: true} : null)
      );
    };
  }
}
