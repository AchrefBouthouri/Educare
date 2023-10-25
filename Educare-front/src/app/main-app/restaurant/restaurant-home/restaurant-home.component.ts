import { Component, OnInit } from '@angular/core';
import {interval, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, startWith, switchMap} from "rxjs/operators";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.css']
})
export class RestaurantHomeComponent implements OnInit {

  nextMealTime: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getNextMealTime();
    setInterval(() => {
      this.getNextMealTime();
    }, 1000); // refresh every 10 seconds
  }

  getNextMealTime() {
    this.http.get('http://localhost:8082/mealreminder/next-meal', { responseType: 'text' }).subscribe(
      response => {
        this.nextMealTime = response;
      },
      error => {
        console.log('Error:', error);
      }
    );
  }
}
