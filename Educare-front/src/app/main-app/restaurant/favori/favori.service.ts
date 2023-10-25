import { M } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriService {

  constructor(private http : HttpClient ) { }
  getAllMenus(){
return this.http.get<any>(
  'http://localhost:8082/api/restaurant/getmenus')
  .pipe(map(response => {
    return response;
  }));

  }
  ;
  private baseUrl = 'http://localhost:8082/MenuPreferences';

  createMenuPreference(menuId: number, mail: string): Observable<any> {
    const url = `${this.baseUrl}/add/${menuId}`;
    const preference = { mail: mail };
    return this.http.put(url, preference);
  }
   
  



  
}
