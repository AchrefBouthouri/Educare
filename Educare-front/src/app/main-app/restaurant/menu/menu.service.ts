import { M } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http : HttpClient ) { }
  getAllMenus(){
return this.http.get<any>(
  'http://localhost:8082/api/restaurant/getmenus')
  .pipe(map(response => {
    return response;
  }));

  }
  ;



  private baseUrl = 'http://localhost:8082/api/restaurant';

  creeMenu(name: any,  description: any, price: any ,calories:any) {
    const url = `${this.baseUrl}/creemenu`;
    const body = { name: name, description: description , price: price, calories: calories };
    return this.http.post(url, body);
  }
  updateMenu(id: number, name: string, description: string, price: number, calories: number) {
    const url = `${this.baseUrl}/updatemenu/${id}`;
    const body = { id ,name, description, price, calories };
    return this.http.put(url, body);
}

public deletemenu(id: any) {
  return this.http.delete<void>('http://localhost:8082/api/restaurant/supprimer/'+id);
}
}
