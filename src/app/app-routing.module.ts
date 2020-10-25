import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)},
  {path: 'users', loadChildren: () => import('./user/user.module').then((m) => m.UserModule)},
  {path: 'search', loadChildren: () => import('./search/search.module').then((m) => m.SearchModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
