import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {AvatarModule} from 'ngx-avatar';
import {UserCardComponent} from './components/user-card/user-card.component';
import {FollowBtnComponent} from './components/buttons/follow-btn/follow-btn.component';
import {PostCardComponent} from './components/post-card/post-card.component';
import {CodeInputModule} from 'angular-code-input';
import {WriteFabComponent} from './components/buttons/write-fab/write-fab.component';
import {AddPostComponent} from './components/dialogs/add-post/add-post.component';
import { EditProfileComponent } from './components/dialogs/edit-profile/edit-profile.component';

const NG_MODULES = [
  CommonModule,
  FlexLayoutModule,
  ReactiveFormsModule,
];

const LIBS_MODULES = [
  AvatarModule,
  CodeInputModule
];

const COMPONENTS = [
  UserCardComponent,
  FollowBtnComponent,
  PostCardComponent,
  WriteFabComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    AddPostComponent,
    EditProfileComponent
  ],
  imports: [
    ...NG_MODULES,
    ...LIBS_MODULES,
    MaterialModule
  ],
  exports: [
    ...NG_MODULES,
    ...LIBS_MODULES,
    ...COMPONENTS,
    MaterialModule,
  ]
})
export class SharedModule {
}
