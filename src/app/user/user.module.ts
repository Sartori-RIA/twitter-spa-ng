import {NgModule} from '@angular/core';

import {UserRoutingModule} from './user-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {SharedModule} from '../shared/shared.module';
import {FollowersComponent} from './followers/followers.component';
import {PostsComponent} from './posts/posts.component';
import {FollowsComponent} from './follows/follows.component';
import {PostComponent} from './post/post.component';
import {UploadFileModule} from '../upload-file/upload-file.module';


@NgModule({
  declarations: [
    ProfileComponent,
    FollowersComponent,
    PostsComponent,
    FollowsComponent,
    PostComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    UploadFileModule
  ]
})
export class UserModule {
}
