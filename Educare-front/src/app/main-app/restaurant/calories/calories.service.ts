import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CalorieService {

  constructor(private http: HttpClient) { }

  getCaloriePercentage(mealName: string, height: number, weight: number, age: number, isMale: boolean) {
    const url = `http://localhost:8082/calories/${mealName}?height=${height}&weight=${weight}&age=${age}&isMale=${isMale}`;
    // @ts-ignore
    return this.http.get<any>(url, { responseType: 'any' });
  }
}
