import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  constructor(private http: HttpClient) { }
  getAllRDV() {
    return this.http.get<any>(
      'http://localhost:8081/api/maintenance/rdv')
      .pipe(map(response => {
        return response;
      }));
  }
}
