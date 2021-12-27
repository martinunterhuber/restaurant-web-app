import { Injectable } from '@angular/core';
import globalUserList from '../assets/users.json';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';
import { MessageResponse } from './models/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  constructor(private client: HttpClient) { }

  public getUserList(): Observable<User[]> {
    return this.client.get<User[]>("http://localhost:3000/users");
  }

  public getUserById(id: number): Observable<User> {
    return this.client.get<User>("http://localhost:3000/users/" + id);
  }

  public addUser(user: User): Observable<MessageResponse> {
    return this.client.post<MessageResponse>("http://localhost:3000/users", user);
  }

  public updateUser(user: User): Observable<MessageResponse> {
    return this.client.put<MessageResponse>("http://localhost:3000/users/" + user.id, user);
  }

  public deleteUser(id: number): Observable<MessageResponse> {
    return this.client.delete<MessageResponse>("http://localhost:3000/users/" + id);
  }
}
