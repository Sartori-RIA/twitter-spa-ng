import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {AvatarModule} from 'ngx-avatar';
import {UserCardComponent} from './components/user-card/user-card.component';
import {FollowBtnComponent} from './components/follow-btn/follow-btn.component';
import {PostCardComponent} from './components/post-card/post-card.component';
import {CodeInputModule} from 'angular-code-input';

const NG_MODULES = [
  CommonModule,
  FlexLayoutModule,
  ReactiveFormsModule,
];

const LIBS_MODULES = [
  AvatarModule,
  CodeInputModule
];

@NgModule({
  declarations: [UserCardComponent, FollowBtnComponent, PostCardComponent],
  imports: [
    ...NG_MODULES,
    ...LIBS_MODULES,
    MaterialModule
  ],
  exports: [
    ...NG_MODULES,
    ...LIBS_MODULES,
    MaterialModule,
    UserCardComponent,
    PostCardComponent
  ]
})
export class SharedModule {
}
