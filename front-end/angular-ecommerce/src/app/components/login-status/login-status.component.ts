import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: 'login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  storage: Storage = sessionStorage;
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    //Subscribes to the token and email observables
    //and stores the values in the session storage
    this.auth.getAccessTokenSilently().subscribe((data) => {
      this.storage.setItem('token', data);
    });
    this.auth.user$.subscribe((userData) => {
      this.storage.setItem('email', JSON.stringify(userData?.email));
    });
  }
}
