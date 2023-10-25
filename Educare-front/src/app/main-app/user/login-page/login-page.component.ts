import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/service/auth/auth.service";
import {TokenStorageService} from "../../../core/service/token/token-storage.service";
import {error} from "@angular/compiler/src/util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router : Router
              ) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({

      next: (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        console.log(data)
        this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
      complete: () => {
        console.log('login completed');
      }
    });
  }


  reloadPage(): void {
    this.router.navigate(["/dashboard"])
  }


}
