import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { GridComponent } from './grid/grid.component';
import { ListsComponent } from './lists/lists.component';
// import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { ReclamationComponent } from '../main-app/maintenance/reclamation/reclamation.component';
import { OrderComponent } from '../main-app/restaurant/order/order.component';
import { BookingComponent } from '../main-app/foyer/booking/booking.component';
import { RegisterComponent } from '../main-app/user/register/register.component';
import { ForumComponent } from '../main-app/forum/forum/forum.component';
import { CapacityComponent } from '../main-app/restaurant/capacity/capacity.component';
import { CaloriesComponent } from '../main-app/restaurant/calories/calories.component';
import {HOME} from "@angular/cdk/keycodes";
import {RestaurantHomeComponent} from "../main-app/restaurant/restaurant-home/restaurant-home.component";
import {StatisticsComponent} from "../main-app/restaurant/order/statistics/statistics.component";
import { RendezVousComponent } from '../main-app/maintenance/rendez-vous/rendez-vous.component';
import { RoomComponent } from '../main-app/foyer/room/room.component';
import { FoyerComponent } from '../main-app/foyer/foyer.component';
import { MenuComponent } from '../main-app/restaurant/menu/menu.component';
import { MenuDeSemaineComponent } from '../main-app/restaurant/menu/menu-de-semaine/menu-de-semaine.component';
import { FavoriComponent } from '../main-app/restaurant/favori/favori.component';



export const MaterialRoutes: Routes = [
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'menuSemaine',
    component : MenuDeSemaineComponent
      
  },
  {
    path: 'favori',
    component : FavoriComponent
      
  },
  {
    path: 'MealStats',
    component: StatisticsComponent
  },

  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'romm',
    component: RoomComponent
  },
  {
    path: 'capacity',
    component: CapacityComponent
  },
  {
    path: 'booking',
    component: BookingComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'forum',
    component: ForumComponent
  },
  { 
    path: 'claim', 
    component: ReclamationComponent 
  }, 
  { 
    path: 'appointment', 
    component: RendezVousComponent 
  }
  // {
  //   path: 'button',
  //   component: ButtonsComponent
  // },
  // {
  //   path: 'grid',
  //   component: GridComponent
  // },
  // {
  //   path: 'lists',
  //   component: ListsComponent
  // },
  // // {
  // //   path: 'menu',
  // //   component: MenuComponent
  // // },
  // {
  //   path: 'tabs',
  //   component: TabsComponent
  // },
  // {
  //   path: 'stepper',
  //   component: StepperComponent
  // },
  // {
  //   path: 'expansion',
  //   component: ExpansionComponent
  // },
  // {
  //   path: 'chips',
  //   component: ChipsComponent
  // },
  // {
  //   path: 'toolbar',
  //   component: ToolbarComponent
  // },
  // {
  //   path: 'progress-snipper',
  //   component: ProgressSnipperComponent
  // },
  // {
  //   path: 'progress',
  //   component: ProgressComponent
  // },
  // {
  //   path: 'dialog',
  //   component: DialogComponent
  // },
  // {
  //   path: 'tooltip',
  //   component: TooltipComponent
  // },
  // {
  //   path: 'snackbar',
  //   component: SnackbarComponent
  // },
  // {
  //   path: 'slider',
  //   component: SliderComponent
  // },
  // {
  //   path: 'slide-toggle',
  //   component: SlideToggleComponent
  // }
];

