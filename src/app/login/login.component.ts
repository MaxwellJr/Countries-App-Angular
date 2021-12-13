import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public user: User;
  public showLoginAlert: boolean;
  private subscribtion: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.user = { login: "", password: "" };
    this.showLoginAlert = false;
  }

  ngOnInit(): void {
  }

  signInButtonClick(): void {
    if (this.user.login !== "" && this.user.password !== "") {
      this.subscribtion = this.authService.login(this.user).subscribe((response: User) => {
        if (response.login !== "") {
          this.user = response;
          this.showLoginAlert = false;
          this.authService.setLoginStatus(true);
          this.router.navigate(['search']);
        }
      }, (error => {
        this.showLoginAlert = true;
      }));
    }
  }

  ngOnDestroy(): void {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }
}