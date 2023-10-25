import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from './comment';
import { profile } from './profile';
import { User } from 'src/app/core/model/user.model';
@Injectable({
  providedIn: 'root'
})
export class ForumserviceService {
  private baseUrl = 'http://localhost:8084/forum/api/forum';
  private readonly apiUrl = 'http://localhost:8084/forum/api/profile';
  private urluser ='http://localhost:8001/api'
  constructor(private http: HttpClient) { }

  retrieveAllComments() {
    return this.http.get<Comment[]>(`${this.baseUrl}/`);
  }
  getComment(idParent: number): Observable<Comment[]> {
    const url = `${this.baseUrl}/HomePage?idParent=${idParent}`;
    return this.http.get<Comment[]>(url);
  }
 ajout(sujet: string, description: string,iduser:number): Observable<Comment> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const commentData = {
      sujet: sujet,
      description: description,
      iduser:iduser

    };
    return this.http.post<Comment>(this.baseUrl+'/NewPost', commentData, httpOptions);
  }
  voteComment(commentId: number, type: string): Observable<Comment> {
    const url = `${this.baseUrl}/${commentId}/vote?type=${type}`;
    return this.http.post<Comment>(url, null);
  }
    replyToComment(description: string, idParent: number,iduser:number): Observable<Comment> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const commentData = {
        iduser :iduser,
        description: description
      };
    const url = `${this.baseUrl}/reply?idParent=${idParent}`;
    return this.http.post<Comment>(url, commentData,httpOptions);
  }
  getProfileByUserId(userId: string): Observable<profile> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<profile>(url);
  }
  createProfile(profile: profile): Observable<profile> {
    return this.http.post<profile>(`${this.apiUrl}/create/`, profile);
  }
  uploadImage(profileId: number, formData: FormData) {
    return this.http.post(`${this.apiUrl}/profile/${profileId}/image`, formData);
  }
  getUserById(id: number): Observable<User> {
    const url = `${this.urluser}/user/${id}`;
    return this.http.get<User>(url);
  }
}
