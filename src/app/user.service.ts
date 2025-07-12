import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../data/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl="https://67a138b55bcfff4fabe1fa58.mockapi.io/api/namelist/users"
constructor(private http: HttpClient) { }

getUsers(): Observable<User[]>{
  return this.http.get<User[]>(this.apiUrl)
}

addUser(user:any): Observable<any>{
  return this.http.post<any>(this.apiUrl,user)
}

deleteUser(id:number): Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}/${id}`)
}

updateUser(user:User): Observable<User>{
  return this.http.put<User>(`${this.apiUrl}/${user.id}`, user)
}

}
  

