import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {UsersService} from '../core/api/users.service';

export namespace CookieCodeValidators {

  export function uniqueEmail(service: UsersService, oldEmail?: string): AsyncValidatorFn {
    console.log(oldEmail);
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (control.value == null || oldEmail === control.value) {
        return of(null);
      }
      return service.checkEmail(control.value).pipe(
        map((response) =>
          response.status === 409 && oldEmail !== control.value ? {emailInUse: true} : null)
      );
    };
  }

  export function uniqueUsername(service: UsersService, oldUsername?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (control.value == null || oldUsername === control.value) {
        return of(null);
      }
      return service.checkUsername(control.value).pipe(
        map((response) =>
          response.status === 409 && oldUsername !== control.value ? {emailInUse: true} : null)
      );
    };
  }
}
