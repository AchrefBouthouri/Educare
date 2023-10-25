import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private onAddReclmation = new Subject();
  onAddReclamationEvent = this.onAddReclmation.asObservable();
  private onUpdateReclmation = new Subject();
  onUpdateReclamationEvent = this.onUpdateReclmation.asObservable();
  private onClotureReclmation = new Subject();
  onClotureReclamationEvent = this.onClotureReclmation.asObservable();
  private onDeleteReclmation = new Subject();
  onDeleteReclamationEvent = this.onDeleteReclmation.asObservable();

  constructor(private http: HttpClient) { }
  getAllReclamation() {
    return this.http.get<any>(
      'http://localhost:8081/api/maintenance/reclamation')
      .pipe(map(response => {
        return response;
      }));
  }

  getReclamationById(id: any) {
    return this.http.get<any>(
      'http://localhost:8081/api/maintenance/reclamation/'+id)
      .pipe(map(response => {
        return response;
      }));
  }
  AddReclamation(id: any,data: any) {
    return this.http.post<any>(
      'http://localhost:8081/api/maintenance/reclamation/'+id,data)
      .pipe(map(response => {
        this.onAddReclmation.next(response);
        return response;
      }));
  }

  UpdateReclamation(id: any,data: any) {
    return this.http.put<any>(
      'http://localhost:8081/api/maintenance/reclamation/'+id,data)
      .pipe(map(response => {
        this.onUpdateReclmation.next(response);
        return response;
      }));
  }

  ClotureReclamation(id: any, data?: any) {
    return this.http.put<any>(
      'http://localhost:8081/api/maintenance/reclamation/cloture/'+id,data)
      .pipe(map(response => {
        this.onClotureReclmation.next(response);
        return response;
      }));
  }

  DeleteReclamation(id: any) {
    return this.http.delete<any>(
      'http://localhost:8081/api/maintenance/reclamation/'+id)
      .pipe(map(response => {
        this.onDeleteReclmation.next(response);

        return response;
      }));
  }
}
