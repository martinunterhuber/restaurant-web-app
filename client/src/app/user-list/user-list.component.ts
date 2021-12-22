import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  userList: User[] = [];

  isAdd = false;
  errorMessage = "";

  constructor(private listService: UserListService) {
    this.refresh();
  }

  public refresh() {
    this.userList = this.listService.getUserList();
  }

  public add() {
    this.errorMessage = "";
    this.isAdd = true;
  }

  public cancelAdd() {
    this.isAdd = false;
  }

  public saveUser(user: User) {
    // if (user.name != oldName && this.listService.getUserByName(user.name) !== undefined) {
    //   this.errorMessage = "Duplicate user name!"
    // } else 
    if (user.userId == 0) {
      this.errorMessage = "";
      this.listService.addUser(user);
      this.cancelAdd();
    } else {
      this.errorMessage = "";
      this.listService.updateUser(user);
    }
  }

  public deleteUser(id: number) {
    this.listService.deleteUser(id);
  }

  public createUser(): User {
    return {"userId": 0, "role": [], "name": "", "password": ""}
  }
}
