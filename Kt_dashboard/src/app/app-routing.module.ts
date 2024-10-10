import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './gards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule), canActivate:[AuthGuard]},
  { path: 'users', loadChildren: () => import('./users/users.module').then((m) => m.UsersModule), canActivate:[AuthGuard]},
  { path: '**', component: NotFoundComponent },
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
