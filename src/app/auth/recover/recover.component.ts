import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../core/api/auth.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {
  emailNotFound: boolean;
  emailField: FormControl = this.fb.control(null, [
    Validators.required,
    Validators.email
  ]);

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.emailField.valid) {
      this.authService.sendCodeToEmail(this.emailField.value)
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigateByUrl('/auth/codigo');
        }, () => this.emailNotFound = true);
    }
    this.emailField.markAllAsTouched();
  }
}
