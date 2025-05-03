import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserInfo } from './models';
import { AuthenticationService } from './services';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  currentUser: UserInfo | undefined;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x!);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
