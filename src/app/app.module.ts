import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { DatabaseComponent } from './database/database.component';
import { SharedService } from './shared.service'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component'
import { AuthService } from './auth.service';
import { AccessGuard } from './accessguard';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DatabaseComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedService, AuthService, AccessGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
