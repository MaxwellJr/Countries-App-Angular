import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'Angular Countries';

  constructor(private authService: AuthService) {}

  private subscribtion: Subscription;

  isLoggedIn(): boolean {
    return this.authService.getLoginStatus();
  }

  logoutButtonClick(): void {
    this.subscribtion = this.authService.logout().subscribe(response => console.log(response));
    this.authService.setLoginStatus(false);
  }

  ngOnDestroy(): void {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }
}
