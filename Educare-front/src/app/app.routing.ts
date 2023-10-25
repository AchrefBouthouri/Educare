import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { FoyerComponent } from './main-app/foyer/foyer.component';
import { RestaurantComponent } from './main-app/restaurant/restaurant.component';
import {HomepageComponent} from "./homepage/homepage.component";
import {CaloriesComponent} from "./main-app/restaurant/calories/calories.component";
import { LoginPageComponent } from './main-app/user/login-page/login-page.component';
import { RegisterComponent } from './main-app/user/register/register.component';
import { MailResetComponent } from './main-app/user/mail-reset/mail-reset.component';
import { ResetPasswordComponent } from './main-app/user/reset-password/reset-password.component';
import { AddRolesComponent } from './main-app/user/admin/roles/add-roles/add-roles.component';
import { GetUsersComponent } from './main-app/user/admin/users/get-users/get-users.component';
import { RoleToUserComponent } from './main-app/user/admin/users/role-to-user/role-to-user.component';
import { MenuDeSemaineComponent } from './main-app/restaurant/menu/menu-de-semaine/menu-de-semaine.component';
import { FavoriComponent } from './main-app/restaurant/favori/favori.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'role',
        component: AddRolesComponent
      },
      {
        path: 'users',
        component: GetUsersComponent
      },
      {
        path: 'roleToUser',
        component: RoleToUserComponent
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ],

  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'mail-reset',
    component: MailResetComponent
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'restaurant',
    component: RestaurantComponent
  },
  {
    path: 'foyer',
    component: FoyerComponent
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'calories',
    component: CaloriesComponent
  }

];
