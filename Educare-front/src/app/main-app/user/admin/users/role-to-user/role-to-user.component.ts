import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from '../../../../../core/service/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-to-user',
  templateUrl: './role-to-user.component.html',
  styleUrls: ['./role-to-user.component.css'],
})
export class RoleToUserComponent implements OnInit {
  roleToUserForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.roleToUserForm = this.fb.group({
      username: ['', Validators.required],
      roleName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.roleToUserForm = this.fb.group({
      username: ['', Validators.required],
      roleName: ['', Validators.required],
    });
  }

  roleToUser() {
    const formData = this.roleToUserForm.value;
    this.userService.roleToUser(formData).subscribe(
      () => {
        console.log('Role added successfully!');
        this.router.navigate(['/users']);
      },
      (error) => {
        console.error('An error occurred:', error);
      },
    );

  }
}
