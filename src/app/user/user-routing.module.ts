import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {UserResolver} from '../core/resolvers/user.resolver';
import {FollowersComponent} from './followers/followers.component';
import {FollowsComponent} from './follows/follows.component';
import {PostsComponent} from './posts/posts.component';
import {PostComponent} from './post/post.component';
import {PostResolver} from '../core/resolvers/post.resolver';

const routes: Routes = [
  {
    path: ':id', component: ProfileComponent, resolve: {
      user: UserResolver
    }, children: [
      {path: 'seguidores', component: FollowersComponent},
      {path: 'seguindo', component: FollowsComponent},
      {path: 'postagens', component: PostsComponent},
      {
        path: 'postagens/:id', component: PostComponent, resolve: {
          post: PostResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
