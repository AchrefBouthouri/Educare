import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  URL = 'http://localhost:8001/api'
  constructor(private httpClient: HttpClient) {
  }
  addRole(role: any){
    return this.httpClient.post(this.URL+'/role/save',role);
  }

  getRoles():Observable<any[]>{
    return this.httpClient.get<any>(this.URL+"/roles");
  }

  deleteRole(id: number): Observable<any> {
    return this.httpClient.delete(this.URL + "/deleteRole/"+id);
  }

}
