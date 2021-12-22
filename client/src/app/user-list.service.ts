import { Injectable } from '@angular/core';
import globalUserList from '../assets/users.json';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  static id = 4;
  private userList: User[] = [];

  constructor() {
    this.userList = globalUserList as User[];
  }

  public getUserList(): User[] {
    return this.userList;
  }

  public getUserById(id: number): User | undefined {
    return this.userList.find(user => user.userId == id);
  }

  public addUser(user: User) {
    // This should be handle by the database later
    user.userId = UserListService.id++;
    this.userList.push(user);
  }

  public updateUser(user: User) {
    this.userList[this.userList.findIndex(c => c.userId == user.userId)] = user;
  }

  public deleteUser(id: number) {
    let userIndex = this.userList.findIndex(user => user.userId == id);
    if (userIndex >= 0) {
      this.userList.splice(userIndex, 1);
    }
  }
}
