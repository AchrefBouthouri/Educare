import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgCircleProgressModule} from "ng-circle-progress";
import {CaloriesComponent} from "./calories.component";
import {DemoMaterialModule} from "../../../demo-material-module";
import {FormsModule} from "@angular/forms";
import {NgxGaugeModule} from "ngx-gauge";




@NgModule({

  imports: [
    CommonModule,
    DemoMaterialModule,
    FormsModule,
    NgxGaugeModule


  ],
  declarations: [
    CaloriesComponent
  ]
})
export class CaloriesModule { }
