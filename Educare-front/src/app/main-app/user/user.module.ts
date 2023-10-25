import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginPageComponent } from './login-page/login-page.component';
import { AddRolesComponent } from './admin/roles/add-roles/add-roles.component';
import { GetUsersComponent } from './admin/users/get-users/get-users.component';
import { MatTableModule} from "@angular/material/table";
import { MatSortModule} from "@angular/material/sort";
import { MatPaginatorModule} from "@angular/material/paginator";
import {RouterModule} from "@angular/router";
import { RoleToUserComponent } from './admin/users/role-to-user/role-to-user.component';
import { MailResetComponent } from './mail-reset/mail-reset.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';




@NgModule({
  declarations: [
    RegisterComponent,
    LoginPageComponent,
    AddRolesComponent,
    GetUsersComponent,
    RoleToUserComponent,
    MailResetComponent,
    ResetPasswordComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DemoMaterialModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        RouterModule


    ]
})
export class UserModule { }
