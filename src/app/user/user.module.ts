import {NgModule} from '@angular/core';

import {UserRoutingModule} from './user-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {SharedModule} from '../shared/shared.module';
import { FollowersComponent } from './followers/followers.component';
import { PostsComponent } from './posts/posts.component';
import { FollowsComponent } from './follows/follows.component';


@NgModule({
  declarations: [
    ProfileComponent,
    FollowersComponent,
    PostsComponent,
    FollowsComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
  ]
})
export class UserModule {
}
