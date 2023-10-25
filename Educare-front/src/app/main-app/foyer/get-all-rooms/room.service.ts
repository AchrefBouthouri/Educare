import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from './room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:4444/api/room';

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  getRoomById(id: string): Observable<Room> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Room>(url);
  }
  getRoom(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }
  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room);
  }
  updateRoom(roomNumber: string, room: Room): Observable<Room> {
    const url = `${this.apiUrl}/${roomNumber}`;
    return this.http.put<Room>(url, room);
  }

  getRoomByNumber(roomNumber: string): Observable<Room> {
    const url = `${this.apiUrl}/${roomNumber}`;
    return this.http.get<Room>(url);
  }

  deleteRoom(roomNumber: string): Observable<unknown> {
    const url = `${this.apiUrl}/${roomNumber}`;
    return this.http.delete(url);
  }
}
