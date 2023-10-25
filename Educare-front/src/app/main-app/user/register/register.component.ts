import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AuthService} from "../../../core/service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
              private userService: AuthService,
              private router: Router
  ) {
    this.loginForm = this.createForm() ;
  }
  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(){
    console.log(this.loginForm.getRawValue());
    this.userService.addUser(this.loginForm.getRawValue()).subscribe(() =>{
      console.log('saved');
      this.loginForm.reset();
      this.router.navigate(['/login']);
    })
  }
  ngOnInit(): void {
  }

}
