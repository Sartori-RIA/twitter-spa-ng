import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './index';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {NavigationActionTiming, RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {CustomSerializer} from './custom-router-serializer';
import {AuthEffects} from './auth/auth.effects';
import {UserEffects} from './user/user.effects';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AppEffects, AuthEffects, UserEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
      navigationActionTiming: NavigationActionTiming.PostActivation
    }),
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomSerializer},
  ]
})
export class AppStoreModule {

}