import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {AppStoreModule} from './store/app-store.module';
import {LottieModule} from 'ngx-lottie';
export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AppStoreModule,
    LottieModule.forRoot({player: playerFactory, useCache: true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
