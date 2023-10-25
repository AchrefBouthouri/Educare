import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../core/service/auth/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token!: string; // store the token from the URL parameter
  password! : string; // store the new password from the form
  message! : string; // store the response message from the backend

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
      this.token="",
      this.password="",
        this.message=""

  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  onSubmit(): void {
    this.authService.resetPassword(this.token, this.password)
      .subscribe(
        response => {
          this.message = response.message; // handle the response message
        },
        error => {
          console.log(error); // handle the error
        }
      );
  }

}
