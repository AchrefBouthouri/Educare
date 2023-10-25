import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {ICapacity} from "./ICapacity";


@Injectable({
  providedIn: 'root'
})
export class CapacityService {

  constructor(private http: HttpClient) { }
  getAllCapacity() {
    return this.http.get<any>(
      'http://localhost:8082/capacity/')
      .pipe(map(response => {
        return response;
      }));
  }


  updateCapacityValue(id: number, newValue: number): Observable<ICapacity> {
    const url = `http://localhost:8082/capacity/${id}/value?value=${newValue}`;
    const body = { value: newValue };
    return this.http.put<ICapacity>(url, body);
  }

  public deleteCapacity(id: number) : Observable<void> {
    return this.http.delete<void>(`http://localhost:8082/capacity/${id}`);
  }


  createCapacity(capacity: { value: any }): Observable<ICapacity> {
    return this.http.post<ICapacity>('http://localhost:8082/capacity/', capacity);
  }

}
