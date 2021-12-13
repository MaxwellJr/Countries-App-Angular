import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private router: Router) {
    this.user = {login: "", password: ""};
  }

  public user: User;
  private subscribtion: Subscription;

  ngOnInit(): void {
  }

  signUpButtonClick(): void {
    if (this.user.login !== "" && this.user.password !== "") {
      this.subscribtion = this.authService.register(this.user).subscribe((response: User) => {
        if (response.login !== "") {
          //this.user = response;
          this.authService.setLoginStatus(true);
          this.router.navigate(['search']);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }
}
