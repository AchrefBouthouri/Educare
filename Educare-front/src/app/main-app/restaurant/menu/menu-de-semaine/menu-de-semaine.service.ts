import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MenuDeSemaine {

  constructor(private http : HttpClient ) { }
  getAllMenus(){
return this.http.get<any>(
  'http://localhost:8082/api/semaine/allMenus')
  .pipe(map(response => {
    return response;
  }));

  }
  ;
}
