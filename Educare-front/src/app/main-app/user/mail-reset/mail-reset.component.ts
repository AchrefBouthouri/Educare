import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/service/auth/auth.service";

@Component({
  selector: 'app-mail-reset',
  templateUrl: './mail-reset.component.html',
  styleUrls: ['./mail-reset.component.css']
})
export class MailResetComponent implements OnInit {

  resetPasswordForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  mailReset(): void {
    const email = this.resetPasswordForm.get('email')?.value;
    this.authService.mailReset(email).subscribe(() => {
      console.log('Password reset email sent successfully');
    }, error => {
      console.error('An error occurred while resetting password:', error);
    });
  }
}
