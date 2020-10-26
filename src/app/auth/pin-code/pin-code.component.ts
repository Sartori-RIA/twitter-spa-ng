import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/api/auth.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pin-code',
  templateUrl: './pin-code.component.html',
  styleUrls: ['./pin-code.component.scss']
})
export class PinCodeComponent implements OnInit {

  invalidCode: boolean;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onCodeCompleted(code: string): void {
    this.authService.submitPinCode(code)
      .pipe(take(1))
      .subscribe(({body: {token}}) => {
        this.router.navigate(['/auth/nova-senha'], {state: {token}});
      }, () => {
        this.invalidCode = true;
      });
  }
}
