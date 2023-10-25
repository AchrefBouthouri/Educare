import { Component, OnInit } from '@angular/core';
import {CalorieService} from "./calories.service";
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-calories',
  templateUrl: './calories.component.html',
  styleUrls: ['./calories.component.css']
})
export class CaloriesComponent implements OnInit {
  gaugeType = "arch";
  gaugeLabel = "of your daily calories";
  gaugeAppendText = "%";
  markerConfig = {
    "0": { color: '#fdfdfd', size: 8, label: '0', type: 'line'},
    "30": { color: '#ffffff', size: 8, label: '30', type: 'line'},
    "50": { color: '#ffffff', size: 8, label: '50', type: 'line'},
    "70": { color: '#ffffff', size: 8, label: '70', type: 'line'},
    "100": { color: '#ffffff', size: 8, label: '100', type: 'line'},
  }
  thresholdConfig = {
    '0': {color: 'green'},
    '40': {color: 'orange'},
    '75.5': {color: 'red'}
  };

  mealName: any;
  height : any;
  weight: any;
  age: any;
  isMale: any;
  caloriePercentage: any;

  constructor(private calorieService: CalorieService) { }

  ngOnInit(): void {

    }

  calculateCaloriePercentage() {
    this.calorieService.getCaloriePercentage(this.mealName, this.height, this.weight, this.age, this.isMale).subscribe(result => {
      this.caloriePercentage = result;

    });
  }


}
