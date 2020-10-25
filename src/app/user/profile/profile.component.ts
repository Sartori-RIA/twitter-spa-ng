import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {noop, Observable} from 'rxjs';
import {User} from '../../core/models/user';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile$: Observable<User> = this.activatedRoute.data.pipe(map((res) => res.user));

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  openAvatarFull(user: User): void {
    noop();
  }
}
