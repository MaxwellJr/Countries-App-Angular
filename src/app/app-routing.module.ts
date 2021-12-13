import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { DatabaseComponent } from './database/database.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AccessGuard } from './accessguard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path:'search', component: SearchComponent, data: { requiresLogin: true }, canActivate: [ AccessGuard ] },
  { path:'database', component: DatabaseComponent, data: { requiresLogin: true }, canActivate: [ AccessGuard ] },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
